import tensorflowjs as tfjs
import tensorflow as tf
import numpy as np
import h5py

from models import simpleCNN

tf.compat.v1.disable_eager_execution()

# load training and test data
hdf5_file = h5py.File('../data/covers.hdf5', "r")

x_train = hdf5_file['x_train']
x_val   = hdf5_file['x_val']
x_test  = hdf5_file['x_test']
y_train = hdf5_file['y_train']
y_val   = hdf5_file['y_val']
y_test  = hdf5_file['y_test']

# build our nice NN model
model = simpleCNN()

# start training
model.fit(x_train, y_train,
        	epochs=50,
        	validation_data=(x_val, y_val),
			shuffle="batch")

model.save_weights('first_try.h5')  # always save your weights after training or during training
