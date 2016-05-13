defmodule BlueSky.UpdateQuestions do
  use GenServer

  alias BlueSky.GameService

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    Process.send_after(self(), :work, 5_000) # In 5 seconds
    {:ok, state}
  end

  def handle_info(:work, state) do
    #get new question here and push it out after a certain time period or after all users have answered maybe? 
    random_question = GameService.get_random_question

    BlueSky.Endpoint.broadcast("test:lobby", "new_question", 
      %{
        question: random_question.question, 
        a: random_question.a,
        b: random_question.b,
        c: random_question.c,
        d: random_question.d,
        answer: random_question.answer
      })

    # Start the timer again
    Process.send_after(self(), :work, 5_000) # In 5 seconds

    #pass the max_id into the state so we can skip previously seen data in next iteration
    {:noreply, state}#%{"last_id" => max_id}}
  end
end