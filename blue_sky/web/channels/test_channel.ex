defmodule BlueSky.TestChannel do
  use Phoenix.Channel

  # Documentation
  # http://www.phoenixframework.org/docs/channels
  
  def join("test:test", _params, socket) do
     {:ok, %{ data: "Connected", socket: socket}}
  end

  def join("test:" <> thing, _params, socket) do
    {:ok, %{data: thing, socket: socket}}
  end
end
