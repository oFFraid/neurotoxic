FROM python:3.8-slim-bullseye

# Make working directories
RUN  mkdir -p  /server
WORKDIR  /server

# Upgrade pip with no cache
RUN pip install --no-cache-dir -U pip
RUN pip install tensorflow==2.10.0
# Copy application requirements file to the created working directory
COPY requirements.txt .

# Install application dependencies from the requirements file
RUN pip install -r requirements.txt

# Copy every file in the source folder to the created working directory
COPY  . .
