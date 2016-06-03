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
  question: "In J. Edgar Hoover, what did the J stand for?",
  a: "James",
  b: "John",
  c: "Joseph",
  d: "Jake",
  answer: "b"
})

Repo.insert!(%Question{
  question: "What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?",
  a: "1958",
  b: "1968",
  c: "1978",
  d: "1988",
  answer: "d"
})

Repo.insert!(%Question{
  question: "Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
  a: "Frank Robinson",
  b: "Reggie Jackson",
  c: "Harmon Killebrew",
  d: "Willie Mays",
  answer: "d"
})

Repo.insert!(%Question{
  question: "What was the name of the last movie that John Wayne appeared in?",
  a: "The Green Berets",
  b: "The Shootist",
  c: "True Grit",
  d: "Transformers",
  answer: "b"
})

Repo.insert!(%Question{
  question: "What was the name of the last movie that John Wayne appeared in?",
  a: "The Green Berets",
  b: "The Shootist",
  c: "True Grit",
  d: "Transformers",
  answer: "b"
})

Repo.insert!(%Question{
  question: "Which of the following vegetables is not one of the ingredients of V-8 juice?",
  a: "beet",
  b: "carrot",
  c: "spinach",
  d: "cabbage",
  answer: "d"
})

Repo.insert!(%Question{
  question: "What country produces the most potatoes?",
  a: "China",
  b: "United States",
  c: "Ireland",
  d: "Russia",
  answer: "a"
})

Repo.insert!(%Question{
  question: "Marzipan is made with what kind of nut?",
  a: "almond",
  b: "cashew",
  c: "pecan",
  d: "walnut",
  answer: "a"
})

Repo.insert!(%Question{
  question: "In Charles Dickens's novel \"A Tale of Two Cities\", what are names of the two cities?",
  a: "Boston and New York",
  b: "Rome and Venice",
  c: "Brussels and Moscow",
  d: "London and Paris",
  answer: "d"
})

Repo.insert!(%Question{
  question: "Edward Lear is famous for what kind of poem?",
  a: "ballad",
  b: "limerick",
  c: "sonnet",
  d: "haiku",
  answer: "b"
})

Repo.insert!(%Question{
  question: "Which one of the following was not one of The Three Musketeers?",
  a: "Aramis",
  b: "Athos",
  c: "D'Artagnan",
  d: "Porthos",
  answer: "c"
})

Repo.insert!(%Question{
  question: "\"Dewey Defeats Truman\" , an erroneous 1948 headline, was printed on the front page of what newspaper?",
  a: "Chicago Tribune",
  b: "New York Times",
  c: "San Francisco Chronicle",
  d: "Washington Post",
  answer: "a"
})

Repo.insert!(%Question{
  question: "The Baby Ruth candy bar was named for a U.S. president's daughter Ruth. Who was Ruth's father?",
  a: "Grover Cleveland",
  b: "Calvin Coolidge",
  c: "Herbert Hoover",
  d: "William Howard Taft",
  answer: "a"
})

Repo.insert!(%Question{
  question: "In the pilot of Futurama, who was the first character Fry met?",
  a: "Zoidberg",
  b: "Leela",
  c: "Bender",
  d: "Farnsworth",
  answer: "b"
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