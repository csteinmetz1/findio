import os
import sys
import glob
import h5py
import json
import numpy as np
from PIL import Image

covers = glob.glob('data/covers/*.jpg')
nsamples = len(covers)

print(nsamples)

x_data = np.empty([nsamples, 64, 64, 3])
y_data = np.empty([nsamples, 7])

with open('data/track_data.json', 'r') as data_fp:
    track_data = json.load(data_fp)

nloaded = 0

for cover in covers:
	track_id = os.path.basename(cover).replace('.jpg', '')

	# pull out features
	try:
		danceability = track_data['tracks'][track_id]['features']['danceability']
		energy = track_data['tracks'][track_id]['features']['energy']
		mode = track_data['tracks'][track_id]['features']['mode']
		acousticness = track_data['tracks'][track_id]['features']['acousticness']
		instrumentalness = track_data['tracks'][track_id]['features']['instrumentalness']
		liveness = track_data['tracks'][track_id]['features']['liveness']
		valence = track_data['tracks'][track_id]['features']['valence']

		im = Image.open(cover)

		if im.size == (64, 64):
			x_data[nloaded, :] = np.array(im)
		else:
			im = im.resize((64,64))
			x_data[nloaded, :] = np.array(im)
		
		y_data[nloaded, :] = np.array([danceability, energy, mode, acousticness, instrumentalness, liveness, valence])
		nloaded += 1
	except:
		print("Skipping...")

x_train = x_data[:90000]
x_val   = x_data[90000:95000]
x_test  = x_data[95000:]

y_train = y_data[:90000]
y_val   = y_data[90000:95000]
y_test  = y_data[95000:]

print(x_train.shape)
print(x_val.shape)
print(x_test.shape)

print(y_train.shape)
print(y_val.shape)
print(y_test.shape)

# open a hdf5 file and create earrays
hdf5_file = h5py.File('data/covers100k.h5', mode='w')

hdf5_file.create_dataset("x_train", x_train.shape, np.int8)
hdf5_file["x_train"][...] = x_train
hdf5_file.create_dataset("x_val", x_val.shape, np.int8)
hdf5_file["x_val"][...] = x_val
hdf5_file.create_dataset("x_test", x_test.shape, np.int8)
hdf5_file["x_test"][...] = x_test

hdf5_file.create_dataset("y_train", y_train.shape, np.float32)
hdf5_file["y_train"][...] = y_train
hdf5_file.create_dataset("y_val", y_val.shape, np.float32)
hdf5_file["y_val"][...] = y_val
hdf5_file.create_dataset("y_test", y_test.shape, np.float32)
hdf5_file["y_test"][...] = y_test