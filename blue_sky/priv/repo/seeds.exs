# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     BlueSky.Repo.insert!(%BlueSky.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias BlueSky.Repo
alias BlueSky.Question

Repo.delete_all(Question)

Repo.insert!(%Question{
  question: "What is the capital of Nebraska?",
  a: "Lincoln",
  b: "Omaha",
  c: "Grand Island",
  d: "Inman",
  answer: "a"
})

Repo.insert!(%Question{
  question: "What island are lemurs found on?",
  a: "Australia",
  b: "Iceland",
  c: "Madagascar",
  d: "Hawaii",
  answer: "c"
})

Repo.insert!(%Question{
  question: "Who won the World Series in 2011?",
  a: "Texas Rangers",
  b: "New York Yankees",
  c: "New York Jets",
  d: "St. Louis Cardinals",
  answer: "d"
})
