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

Repo.insert!(%Question{
  question: "What is the Spanish word for 'dog'?",
  a: "gato",
  b: "rojo",
  c: "perro",
  d: "casa",
  answer: "c"
})
Repo.insert!(%Question{
  question: "Who wrote the popular book series 'The Hunger Games'?",
  a: "Suzanne Collins",
  b: "Stephanie Meyer",
  c: "J. K. Rowling",
  d: "K. A. Applegate",
  answer: "a"
})
Repo.insert!(%Question{
  question: "Which Constitutional Amendment granted women the right to vote?",
  a: "11th",
  b: "19th",
  c: "20th",
  d: "21st",
  answer: "b"
})
Repo.insert!(%Question{
  question: "Which actor played the character Gandalf in the 'Lord of the Rings' movie trilogy?",
  a: "Ian McKellan",
  b: "Elijah Wood",
  c: "Sean Connery",
  d: "Patrick Stewart",
  answer: "a"
})
Repo.insert!(%Question{
  question: "Which actor did NOT appear in the HBO TV series 'The Sopranos'?",
  a: "Edie Falco",
  b: "James Gandolfini",
  c: "Steven Van Zandt",
  d: "Al Pacino",
  answer: "d"
})
Repo.insert!(%Question{
  question: "What is the birthstone for the month of September?",
  a: "emerald",
  b: "ruby",
  c: "peridot",
  d: "sapphire",
  answer: "d"
})
Repo.insert!(%Question{
  question: "Which of the following is the longest river in Europe?",
  a: "Volga",
  b: "Danube",
  c: "Nile",
  d: "Rhine",
  answer: "a"
})
Repo.insert!(%Question{
  question: "Which color does NOT appear in the German flag?",
  a: "red",
  b: "white",
  c: "gold",
  d: "black",
  answer: "b"
})
Repo.insert!(%Question{
  question: "Which of the following is not one of Michigan's Great Lakes?",
  a: "Lake Huron",
  b: "Lake Michigan",
  c: "Lake St. Clair",
  d: "Lake Erie",
  answer: "c"
})
Repo.insert!(%Question{
  question: "Of the following, which animal has the longest life span?",
  a: "human",
  b: "elephant",
  c: "blue whale",
  d: "giant tortoise",
  answer: "d"
})