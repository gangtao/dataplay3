FROM ubuntu:bionic as base

FROM base as builder

COPY server/requirements-linux.txt /home/

RUN apt-get update -q && \
    # Dependencies
    apt-get install --no-install-recommends -y -q \
        python3-dev \
        python3-pip \
        gcc \
        ca-certificates && \
    pip3 install setuptools pip --upgrade

RUN cd /home && \
    pip install --upgrade pip && \
    pip install -r requirements-linux.txt


FROM base

# Copy packages
COPY --from=builder /usr/local/lib/python3.6 /usr/local/lib/python3.6
RUN mkdir /home/dataplay
WORKDIR /home
ADD server/dataplay /home/dataplay

RUN apt-get update -q && \
    # Dependencies
    apt-get install --no-install-recommends -y -q \
        python3 && \
    # Remove tests and unwanted files 
    find /usr/local/lib/python3.6/ -name 'tests' -exec rm -r '{}' + && \
    find /usr/local/lib/python3.6/ -name '*.pyc' -exec rm -r '{}' + && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/*

EXPOSE 5000
ENTRYPOINT ["python3","-m","dataplay.server"]
