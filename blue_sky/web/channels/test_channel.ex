defmodule BlueSky.TestChannel do
  use Phoenix.Channel

  # Documentation
  # http://www.phoenixframework.org/docs/channels
  
  def join("test:lobby", _params, socket) do
     {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end

  

  def join("test:test", _params, socket) do
     {:ok, %{ data: "Connected", socket: socket}}
  end

  def join("test:" <> thing, _params, socket) do
    {:ok, %{data: thing, socket: socket}}
  end
end
