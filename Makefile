# Define the compiler and standard flags
CC = gcc
CFLAGS = -Wall -O2

# Default target runs everything
all: libmain.so addon main hello

# Compile the pure C shared library for Koffi
libmain.so: lib.c
	rm -f libmain.so
	$(CC) -shared -o libmain.so -fPIC lib.c

# Build the native Node-API addon via node-gyp
addon: binding.gyp addon.c
	rm -rf build
	npx node-gyp configure build

# Compile the standalone main binary
main: main.c
	rm -f main
	$(CC) $(CFLAGS) main.c -o main

# Compile the standalone hello binary
hello: hello.c
	rm -f hello
	$(CC) $(CFLAGS) hello.c -o hello

# Clean up all generated binary artifacts and build folders
clean:
	rm -f libmain.so main hello
	rm -rf build

# Declare targets that are commands rather than file outcomes
.PHONY: all addon clean
