defmodule BlueSky.GameService do

  alias BlueSky.Repo

  alias BlueSky.Player
  alias BlueSky.Room

  import Ecto.Query

  def new_room do
    case Repo.insert(%Room{}) do
      {:ok, result} ->
        result
      {:error, error} ->
        error
    end
  end

  def get_room(room_id) do
    Repo.get(Room, room_id)
  end

  def add_player(room_id) do
    room = get_room(room_id)

    player = Ecto.build_assoc(room, :players)

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

  def get_players(room_id) do
  end

  def get_question(room_id) do
    # Get already asked questions

    # Get new random question not in asked questions
  end

  def answer_question(room_id, question_id, answer) do
  end

  def get_results(room_id, question_id) do
  end

  def get_leaderboard(room_id) do
  end
end
