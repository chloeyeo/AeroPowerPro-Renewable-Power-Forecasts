import os
import math
import numpy
import pathlib
from pprint import pprint
os.chdir(str(pathlib.Path(__file__).parent.resolve()))
# os.chdir("..\O30")
fn = 'N61W007.hgt'
print(os.path.abspath(__file__))
siz = os.path.getsize(fn)
dim = int(math.sqrt(siz/2))

assert dim*dim*2 == siz, 'Invalid file size'

data = numpy.fromfile(fn, numpy.dtype('>i2'), dim*dim).reshape((dim, dim))
pprint(data)
pprint(data.shape)
