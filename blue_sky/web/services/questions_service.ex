defmodule BlueSky.QuestionsService do
  use GenServer

  alias BlueSky.GameService

  def start_link(room_id) do
    state = %{ room_id: room_id, question_ids: [], current_question_id: nil }
    GenServer.start_link(__MODULE__, state, name: {:global, {:update_questions, room_id}})
  end

  def whereis(room_id) do
    :global.whereis_name({:update_questions, room_id})
  end

  def init(state) do
    Process.send_after(self, :work, 1_000) # In 1 second
    IO.puts "Starting a genserver with process id #{inspect(self)}"
    {:ok, state}
  end

  def handle_info(:work, state) do
    IO.puts "Handled work on a gen server"
    IO.inspect state

    # Get new question here and push it out after a certain time period or after all users have answered maybe? 
  
    room_name = "room:" <> state.room_id
    
    case length(state.question_ids) do
      10 ->
        leaderboard = GameService.get_leaderboard(state.room_id)
        BlueSky.Endpoint.broadcast_from(self, room_name, "game_over", %{ leaderboard: leaderboard })
      _ ->
        random_question = GameService.get_random_question(state.question_ids)

        BlueSky.Endpoint.broadcast_from(self, room_name, "new_question", 
          %{
            question: random_question.question,
            order: length(state.question_ids) + 1,
            question_id: random_question.id,
            a: random_question.a,
            b: random_question.b,
            c: random_question.c,
            d: random_question.d,
            answer: random_question.answer
          })

        # Add questions asked to an array
        state = state |> Map.put(:question_ids, [random_question.id | state.question_ids])
                      |> Map.put(:current_question_id, random_question.id)

        # Start the timer again
        Process.send_after(self, :work, 30_000) # In 30 seconds
    end

    {:noreply, state}
  end

  def handle_call(:get_current_question, _from, state) do
    {:reply, state.current_question_id, state}
  end

  def handle_call(:get_questions, _from, state) do
    {:reply, state.question_ids, state}
  end

  def get_current_question(room_id) do
    whereis(room_id) |> GenServer.call(:get_current_question)
  end

  def get_questions(room_id) do
    whereis(room_id) |> GenServer.call(:get_questions)
  end
end
