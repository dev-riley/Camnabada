## 목표

- 우리팀 주제에 맞는 추천 알고리즘을 만들거나 오픈소스를 가져와서 커스터마이징 하기 위한 자료조사를 해보자
- 주제 : SNS 기반의 여행지 추천 서비스
  aa

## 추천 알고리즘

### 종류

1. Content Based Filtering
   - 각각의 사용자와 아이템(우리는 여행지)에 대하여 프로필을 작성하고, 이를 기반으로 추천한다.
   - ex) 유저의 관심사와 여행지의 특징를 설정해놓고 서로 비슷하거나 같은 여행지를 추천해준다.
   - 장점 : Cold start가 없다.
   - 단점 : 데이터셋을 구성하기 어렵다.(데이터 양이 많으면 많을수록), 데이터 작성 시에 주관성이 개입한다.
2. Collaborative Filtering
   - 프로필 데이터 없이, 사용자의 과거 행동 데이터만 가지고 추천한다.
   - ex) 사용자가 본 영화들의 평점 데이터를 이용해 선호할 영화를 추천한다.
   - 장점 : 데이터 셋을 쌓기가 쉽다, 일반적으로 Content Based 보다 정확하다고 알려져 있다.
   - 단점 : 신규 사용자의 경우 기록된 행동 데이터가 없으므로 추천의 정확도가 급격히 떨어지는 Cold Start 문제가 발생한다.
3. Hybrid Filtering
   - Content Based 와 Collaborative 의 한계점을 극복하고자 둘을 함께 사용하는 방식이다.
   - ex) 가입후 일정 데이터가 쌓이기 전까지는 Content Based 방법을, 어느 수준 이상 데이터가 쌓인 이후에는 Collaborative 방법을 사용한다.

이번 프로젝트에서는 회의에서 결정된대로 여행지 하나마다 특징을 여러 태그로 저장해놓고 사용자가 가입 시나 그 이후에 관심사를 설정하면 그에 맞는 여행지를 추천하는 Content Based Filtering을 사용할 예정이다.

### 단점 극복

데이터 셋을 구성하기 어렵다. -> 기존 여행지 리뷰 사이트 등에 요청을 통해 후기를 크롤링 해와서 우리가 원하는 단어가 얼마나 있는지 세어서 자동으로 태그를 달아준다.

데이터 작성 시에 주관성이 개입한다. -> 이 또한 여러사람의 후기를 통해 태그를 설정한다면 주관성이 많이 배제된다고 생각한다.

### 현재 공개되어있는 오픈소스 조사

1. 카카오 Buffalo

   "Buffalo is a fast and scalable production-ready open source project for recommender systems. Buffalo effectively utilizes system resources, enabling high performance even on low-spec machines. The implementation is optimized for CPU and SSD. Even so, it shows good performance with GPU accelerator, too. Buffalo, developed by Kakao, has been reliably used in production for various Kakao services."

2. 카카오 N2

   "Lightweight approximate Nearest Neighbor algorithm library written in C++ (with Python/Go bindings)."

3. 셀던

   - 영국 케임브리지 대학 소속 데이터 과학지들이 만든 기술
   - 2012년 핵심 기술을 개발
   - 2015년부터 Open Predictive Platform이라는 이름으로 오픈소스로 전환
   - 공식 홈페이지 : https://www.seldon.io/

위 문서들을 읽어보다가 Python이 필수적이라는 생각이 들어 코드 분석보다는 파이썬을 먼저 공부해 보기로 하였다.

## Python

### 라이브러리

많은 코드들에서 보였던 라이브러리를 찾아보았다.

    pandas : 쉽고 객관적인 관계형 또는 분류된 데이터로 작업할 수 있도록 설계된 Python 패키지, numpy 기반으로 작동
    - 데이터 구조
        1차원 : Series -> 균일한 유형의 배열로 표시된 1차원 데이터
        2차원 : DataFrame -> 잠재적으로 이질적으로 유형이 지정된 열이있는 테이블 형식의 2차원 데이터

    - 다른 말로 표현하면 더 낮은 차원의 데이터를 위한 유연한 컨테이너다
        DataFrame은 Series의 컨테이너이고 Series는 스칼라의 컨테이너이다.


    numpy : 다차원 배열을 쉽게 처리하고 효율적으로 사용할 수 있도록 지원하는 Python 패키지
    - 데이터는 이미지, 오디오, 텍스트, 숫자 등 다양한 형태와 크기로 존재하는데 컴퓨터는 0,1로만 이해할 수 있다.
    - 그래서 모든 데이터를 숫자(0,1)의 배열로 전환하여 컴퓨터가 이해할 수 있도록 만든다.
    - Python 내장 기능인 리스트 또한 배열 기능을 제공하지만 numpy는 데이터의 크기가 커질수록 저장 및 가공을 하는데 효율성이 좋음

    matplotlib
    - 다양한 데이터를 많은 방법으로 도식화 할 수 있도록 도와주는 Python 라이브러리
    - MATLAB과 비슷한 형태
    - numpy와 pandas에서 사용되는 자료구조를 쉽게 시각화 할 수 있다.

    seaborn
    - matplotlib 기반으로 다양한 색상 테마와 통계용 차트 등의 기능을 추가한 시각화 패키지

    sklearn
    - python을 대표하는 머신러닝 라이브러리
    - 많은 머신러닝 알고리즘이 구현되어 있는데 모든 알고리즘을 같은 방식으로 이용할 수 있다.
    - 샘플 데이터 셋(토이 데이터 셋)이 같이 포함되어있어 바로 머신러닝을 시험해 볼 수 있다.

다음주에는 python 기초 문법을 좀 더 공부하여 sklearn을 이용하여 간단한 모델을 만들어보고 seaborn으로 시각화해보는 작업을 할 예정이다.
