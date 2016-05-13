defmodule BlueSky.UpdateQuestions do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    Process.send_after(self(), :work, 5_000) # In 5 seconds
    {:ok, state}
  end

  def handle_info(:work, state) do
    #get new question here and push it out after a certain time period or after all users have answered maybe? 

    BlueSky.Endpoint.broadcast("test:lobby", "new_msg", %{body: :os.system_time(:seconds)})

    # Start the timer again
    Process.send_after(self(), :work, 5_000) # In 5 seconds

    #pass the max_id into the state so we can skip previously seen data in next iteration
    {:noreply, state}#%{"last_id" => max_id}}
  end
end