FROM python:3.11-alpine

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apk update && \
    apk add --no-cache \
    build-base \
    cmake \
    openblas-dev \
    lapack-dev \
    jpeg-dev \
    zlib-dev \
    libx11-dev \
    gtk+3.0-dev \
    python3-dev

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]