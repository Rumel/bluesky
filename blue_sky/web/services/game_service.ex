defmodule BlueSky.GameService do

  alias BlueSky.Repo

  alias BlueSky.Player
  alias BlueSky.Room
  alias BlueSky.Question

  import Ecto.Query

  def new_room(name) do
    case Repo.insert(%Room{}) do
      {:ok, result} ->
        add_player(result, name)
      {:error, error} ->
        error
    end
  end

  def get_room(room_id) do
    Repo.get(Room, room_id)
  end

  def get_rooms() do
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

  def get_question(room_id) do
    # Get already asked questions

    # Get new random question not in asked questions
  end

  def get_random_question() do
    query = from q in Question,
            order_by: fragment("RANDOM()"),
            limit: 1

    Repo.one(query)
  end

  def answer_question(room_id, question_id, answer) do
  end

  def get_results(room_id, question_id) do
  end

  def get_leaderboard(room_id) do
  end
end
