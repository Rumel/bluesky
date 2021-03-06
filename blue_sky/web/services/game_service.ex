defmodule BlueSky.GameService do

  alias BlueSky.Repo

  alias BlueSky.QuestionsService

  alias BlueSky.Guess
  alias BlueSky.Player
  alias BlueSky.Room
  alias BlueSky.Question

  import Ecto.Query

  def new_room(name) do
    case Repo.insert(%Room{name: name}) do
      {:ok, result} ->
        get_room(result.id) |> Repo.preload(:players)
      {:error, error} ->
        error
    end
  end

  def get_room(room_id) do
    Repo.get(Room, room_id) |> Repo.preload(:players)
  end

  def get_rooms do
    Repo.all(Room)
  end

  def add_player(%Room{id: room_id}, name), do: add_player(room_id, name)
  def add_player(room_id, name) do
    room = get_room(room_id)

    player = Ecto.build_assoc(room, :players)
    player = %Player{player | name: name}

    case Repo.insert(player) do
      {:ok, result} ->
        Repo.preload(result, :room)
      {:error, error} ->
        error
    end
  end

  def remove_player(%Player{id: player_id}), do: remove_player(player_id)
  def remove_player(player_id) do
    query = from p in Player,
            where: p.id == ^player_id,
            select: p

    case Repo.one(query) do
      %Player{} = player ->
        Repo.delete(player)
      nil -> nil
    end
  end

  def get_players(%Room{id: room_id}), do: get_players(room_id)
  def get_players(room_id) do
    query = from p in Player,
            where: p.room_id == ^room_id,
            select: p

    Repo.all(query)
  end

  def get_player(player_id) do
    Repo.get(Player, player_id)
  end

  def get_question(question_id) do
    Repo.get(Question, question_id)
  end

  # Take in room id room_id
  def get_random_question(question_ids) do
    # Get new random question not in asked questions
    query = from q in Question,
            order_by: fragment("RANDOM()"),
            where: q.id in ^question_ids == false,
            limit: 1

    Repo.one(query)
  end

  def answer_question(room_id, question_id, player_id, guess) do
    question = get_question(question_id)
    correct = String.downcase(guess) == String.downcase(question.answer)
    guess = %BlueSky.Guess{question_id: question_id, player_id: player_id, room_id: room_id, guess: guess, correct: correct}

    case Repo.insert(guess) do
      {:ok, result} ->
        result = Repo.preload(result, [:player, :question])
        %{id: result.id, guess: result.guess, answer: result.question.answer, correct: result.correct}
      {:error, error} ->
        error
    end
  end

  def get_leaderboard(room_id) do
    query = from g in Guess,
            where: g.room_id == ^room_id

    guesses = Repo.all(query)
              |> Enum.group_by(fn x -> x.player_id end)
              |> Enum.map(fn
                   {key, value} ->
                     %{ player_id: key, 
                        correct: Enum.filter(value, fn x -> x.correct == true end) |> length }
                 end)
              |> Enum.sort(fn 
                  %{correct: num_one}, %{correct: num_two} -> num_one >= num_two
                 end)
    guesses
  end
end
