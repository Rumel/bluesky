defmodule BlueSky.UpdateQuestions do
  use GenServer

  alias BlueSky.GameService

  def start_link(room_id) do
    GenServer.start_link(__MODULE__, %{ room_id: room_id, lastQuestion: nil })
  end

  def init(state) do
    Process.send_after(self(), :work, 5_000) # In 5 seconds
    IO.puts "Initted a gen server"
    {:ok, state}
  end

  def handle_info(:work, state) do
    IO.puts "handled work on a gen server"
    IO.inspect state

    #get new question here and push it out after a certain time period or after all users have answered maybe? 
    random_question = GameService.get_random_question(state.room_id)

    BlueSky.Endpoint.broadcast_from(self(), "room:" <> state.room_id, "new_question", 
      %{
        question: random_question.question, 
        question_id: random_question.id,
        asked_question_id: random_question.asked_question_id,
        a: random_question.a,
        b: random_question.b,
        c: random_question.c,
        d: random_question.d,
        answer: random_question.answer
      })

    # Add questions asked to an array
    state = %{ state | lastQuestion: random_question.id }

    # Start the timer again
    Process.send_after(self(), :work, 30_000) # In 30 seconds

    #pass the max_id into the state so we can skip previously seen data in next iteration
    {:noreply, state}#%{"last_id" => max_id}}
  end
end
