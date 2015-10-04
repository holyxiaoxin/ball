# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

trophy_list = [
  [ "//dl.dropboxusercontent.com/s/vagyxgf17qxi4hu/IMAG0200.jpg?dl=0", "Trophy 1", "Some description"],
  [ "//dl.dropboxusercontent.com/s/vagyxgf17qxi4hu/IMAG0200.jpg?dl=0", "Trophy 2", "Some description" ]
]

trophy_list.each do |src, alt, description|
  Trophy.create( src: src, alt: alt, description: description )
end
