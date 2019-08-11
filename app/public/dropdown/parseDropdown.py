import json

with (open('genres.txt', 'r')) as genre_fp:
	genres = genre_fp.readlines()
	genres = [genre.strip('\n') for genre in genres]

with (open('years.txt', 'r')) as year_fp:
	years = year_fp.readlines()
	years = [{year.strip('\n').split(',')[0]: year.strip('\n').split(',')[1] } for year in years]

data = {}
data['dropdown'] = {
	'genres' : genres,
	'years'  : years
}

with (open('dropdown.json', 'w')) as json_fp:
	json.dump(data, json_fp, indent=4)