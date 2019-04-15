FROM ubuntu:bionic

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN apt-get update -q && \
    # Dependencies
    apt-get install --no-install-recommends -y -q \
        python3-dev \
        python3-pip \
        build-essential \
        gcc \
        swig \
        curl \
        ca-certificates && \
    pip3 install setuptools pip --upgrade

RUN curl https://raw.githubusercontent.com/automl/auto-sklearn/master/requirements.txt | xargs -n 1 -L 1 pip3 install

COPY server/requirements.txt /home/
RUN cd /home && \
    pip3 install --upgrade pip && \
    pip3 install -r requirements.txt 

# override numpy version  
# refer to https://github.com/scikit-learn-contrib/hdbscan/issues/272
# override holidays version
# refer to https://github.com/facebook/prophet/issues/796 
RUN pip3 install numpy==1.16.0 holidays==0.9.8 --force-reinstall

EXPOSE 8000
RUN mkdir /home/dataplay
WORKDIR /home
COPY entrypoint.sh /home/
COPY server/dataplay /home/dataplay

RUN  find /usr/local/lib/python3.6/ -name 'tests' -exec rm -r '{}' + && \
    find /usr/local/lib/python3.6/ -name '*.pyc' -exec rm -r '{}' + && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/*

CMD ["sh", "/home/entrypoint.sh"]
