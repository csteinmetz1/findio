import tensorflowjs as tfjs
import tensorflow as tf
import numpy as np
import os
import sys
import h5py

from models import simpleCNN

tf.compat.v1.disable_eager_execution()

# load training and test data
hdf5_file = h5py.File('data/covers100k.h5', "r")

x_train = hdf5_file['x_train']
x_val   = hdf5_file['x_val']
x_test  = hdf5_file['x_test']
y_train = hdf5_file['y_train']
y_val   = hdf5_file['y_val']
y_test  = hdf5_file['y_test']

# build our nice NN model
model = simpleCNN()
model.summary()
#sys.exit(0)

# start training
model.fit(x_train[:100], y_train[:100],
        	epochs=50,
        	validation_data=(x_val[:100], y_val[:100]),
			shuffle="batch")

# evaluate
res = model.evaluate(x_test, y_test)
print("Test error:", res)

print(model.predict(x_test[:2]), y_test[:2])

# save results for Python and JS
modeldir = 'models/08072019/'
if not os.path.isdir(modeldir):	
	os.makedirs(modeldir)

model.save_weights(os.path.join(modeldir, 'python08072019.h5')) # always save your weights after training or during training
tfjs.converters.save_keras_model(model, modeldir)