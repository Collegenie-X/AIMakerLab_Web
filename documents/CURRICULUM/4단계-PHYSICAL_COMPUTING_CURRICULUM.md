# 피지컬 컴퓨팅 커리큘럼 (ESP-32 + 라즈베리파이 + 컴퓨터 비전)

## 🎯 과정 개요

**대상**: 중등 3학년, 고등 1-2학년  
**총 시수**: 64시간 (1단계 32시간 + 2단계 32시간)  
**목표**: 실전 IoT 제품 5종 제작 (스마트 카, 스마트 팔, 스마트 홈, 스마트 팜, 무인 차단기)

### 교육 철학: 프로젝트 중심 실전 개발

### 2단계 학습 로드맵

---

## 🚗 5대 핵심 프로젝트

### 프로젝트 개요

### 프로젝트별 난이도 및 시수

| 프로젝트 | 1단계 (ESP32) | 2단계 (라즈베리파이) | 주요 기술 | 난이도 |
|---------|--------------|-------------------|---------|--------|
| **스마트 카** | 4시간 | 8시간 | 모터제어, CV | ⭐⭐⭐⭐ |
| **스마트 팔** | 4시간 | 6시간 | 서보모터, 좌표 | ⭐⭐⭐ |
| **스마트 홈** | 6시간 | 6시간 | IoT, 센서 융합 | ⭐⭐⭐⭐ |
| **스마트 팜** | 4시간 | 6시간 | 센서, 데이터 수집 | ⭐⭐ |
| **무인 차단기** | 4시간 | 8시간 | OCR, 모터 | ⭐⭐⭐⭐⭐ |

---

## 📱 1단계: ESP32 프로토타입 개발 (32시간)

### 왜 ESP32부터 시작하는가?

### 1단계 학습 목표

1. **Serial 통신**: 하드웨어 디버깅의 기초
2. **Camera 모듈**: ESP32-CAM으로 이미지 수집
3. **Web 제어**: WiFi로 원격 제어
4. **App Inventor**: 모바일 앱 연동

### 차시별 세부 계획

| 차시 | 주제 | 핵심 기술 | 실습 | 시간 |
|------|------|----------|------|------|
| **1-2차시** | ESP32 기초 + Serial | Arduino IDE, Serial 통신 | LED 제어 | 4시간 |
| **3-4차시** | ESP32-CAM | Camera 모듈, 이미지 전송 | 감시 카메라 | 4시간 |
| **4-6차시** | Web Server | WiFi, HTTP | 웹 제어 페이지 | 6시간 |
| **7-8차시** | App Inventor | Bluetooth, WiFi | 모바일 앱 | 4시간 |
| **9-11차시** | 프로젝트 1-3 | 스마트 팜, 홈, 팔 | 프로토타입 | 6시간 |
| **12-16차시** | 프로젝트 4-5 | 스마트 카, 무인 차단기 | 프로토타입 | 8시간 |

### 핵심 기술 1: Serial 통신 마스터

#### Serial 통신이란?

#### 실습: LED 제어 + Serial 디버깅 (ChatGPT 활용)

```
학생 → ChatGPT:
"ESP32로 LED를 제어하는 코드를 만들어줘. 
Serial로 '1' 입력하면 켜지고, '0' 입력하면 꺼지게 해줘."

ChatGPT:
"ESP32 Serial LED 제어 프로그램을 만들어드리겠습니다!

필요한 부품:
1. ESP32 개발보드
2. LED 1개
3. 저항 220Ω
4. 점퍼선

회로 연결:
- LED 긴 다리(+) → GPIO 2
- LED 짧은 다리(-) → 220Ω 저항 → GND

Arduino IDE 코드:

```cpp
// ESP32 Serial LED 제어
const int LED_PIN = 2;  // 내장 LED 사용

void setup() {
  // Serial 초기화 (115200 baud)
  Serial.begin(115200);
  
  // LED 핀 설정
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  Serial.println("=============================");
  Serial.println("ESP32 LED 제어 시작!");
  Serial.println("'1' 입력: LED ON");
  Serial.println("'0' 입력: LED OFF");
  Serial.println("=============================");
}

void loop() {
  // Serial 입력 확인
  if (Serial.available() > 0) {
    char command = Serial.read();
    
    // Early return: 유효하지 않은 입력 필터링
    if (command != '0' && command != '1') {
      Serial.println("⚠️ 오류: 0 또는 1만 입력하세요");
      return;
    }
    
    // LED 제어
    if (command == '1') {
      digitalWrite(LED_PIN, HIGH);
      Serial.println("💡 LED ON");
    } else {
      digitalWrite(LED_PIN, LOW);
      Serial.println("🌙 LED OFF");
    }
  }
}
```

실행 방법:
1. Arduino IDE에서 보드 설정
   - 도구 → 보드 → ESP32 Dev Module
   - 포트 선택
2. 업로드 후 시리얼 모니터 열기 (115200 baud)
3. '1' 또는 '0' 입력

디버깅 팁:
- Serial.println()으로 상태 확인
- LED가 안 켜지면 핀 번호 확인
- 통신 속도(baud rate) 일치 확인"
```

### 핵심 기술 2: ESP32-CAM 활용

#### ESP32-CAM이란?

#### 실습: WiFi 스트리밍 카메라 (ChatGPT 활용)

```
학생 → ChatGPT:
"ESP32-CAM으로 WiFi를 통해 카메라 영상을 볼 수 있는 웹 서버를 만들어줘"

ChatGPT:
"ESP32-CAM 웹 스트리밍 서버를 만들어드리겠습니다!

// Arduino IDE 코드
#include "esp_camera.h"
#include <WiFi.h>

// WiFi 설정
const char* ssid = "WiFi_이름";
const char* password = "비밀번호";

// 카메라 핀 설정 (AI-Thinker 모델)
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

void startCameraServer();  // 함수 선언

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32-CAM 시작!");
  
  // 카메라 설정
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  // 프레임 크기 설정
  config.frame_size = FRAMESIZE_VGA;  // 640x480
  config.jpeg_quality = 10;           // 0-63 (낮을수록 고화질)
  config.fb_count = 2;
  
  // 카메라 초기화
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("카메라 초기화 실패: 0x%x\n", err);
    return;
  }
  
  // WiFi 연결
  WiFi.begin(ssid, password);
  Serial.print("WiFi 연결 중");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi 연결 완료!");
  Serial.print("카메라 URL: http://");
  Serial.println(WiFi.localIP());
  
  // 웹 서버 시작
  startCameraServer();
}

void loop() {
  // 서버는 백그라운드로 동작
  delay(10000);
}

사용 방법:
1. Arduino IDE 설정
   - 보드: AI Thinker ESP32-CAM
   - Partition Scheme: Huge APP (3MB)
2. WiFi 정보 입력
3. FTDI 어댑터로 업로드
4. 시리얼 모니터에 나온 IP 주소로 접속
5. 브라우저에서 실시간 영상 확인!

주의사항:
- 업로드 시 IO0을 GND에 연결
- 실행 시 IO0 연결 해제
- 5V 전원 사용 (3.3V는 불안정)"
```

### 핵심 기술 3: App Inventor 모바일 앱 제어

#### App Inventor란?

#### 실습: Bluetooth로 LED 제어 앱

**ESP32 Bluetooth 코드**:

```cpp
#include <BluetoothSerial.h>

BluetoothSerial BT;
const int LED_PIN = 2;

void setup() {
  Serial.begin(115200);
  BT.begin("ESP32_LED");  // Bluetooth 이름
  pinMode(LED_PIN, OUTPUT);
  Serial.println("Bluetooth 시작: ESP32_LED");
}

void loop() {
  if (BT.available()) {
    char cmd = BT.read();
    
    if (cmd == '1') {
      digitalWrite(LED_PIN, HIGH);
      BT.println("ON");
    } else if (cmd == '0') {
      digitalWrite(LED_PIN, LOW);
      BT.println("OFF");
    }
  }
}
```

**App Inventor 블록**:
- BluetoothClient 컴포넌트
- 버튼 2개 (ON/OFF)
- Label (상태 표시)

---

## 🚀 1단계: 5대 프로젝트 프로토타입 (22시간)

### 프로젝트 1: 스마트 팜 (센서 기반) - 4시간

#### 시스템 구성

#### 핵심 코드 (ChatGPT 활용 90%)

```cpp
#include <WiFi.h>
#include <DHT.h>

// 핀 설정
#define SOIL_PIN 34        // 토양 습도 센서 (아날로그)
#define DHT_PIN 4          // DHT22 온습도 센서
#define LIGHT_PIN 35       // 조도 센서 (아날로그)
#define PUMP_PIN 2         // 물펌프 릴레이
#define LED_PIN 15         // LED 조명
#define FAN_PIN 16         // 팬

DHT dht(DHT_PIN, DHT22);

// WiFi 설정
const char* ssid = "WiFi_이름";
const char* password = "비밀번호";

// 임계값 설정
const int SOIL_DRY = 30;   // 토양 건조 기준 (%)
const int TEMP_HIGH = 30;  // 고온 기준 (°C)
const int LIGHT_LOW = 300; // 저조도 기준

void setup() {
  Serial.begin(115200);
  
  // 핀 모드 설정
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);
  
  // 초기 상태: 모두 끄기
  digitalWrite(PUMP_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
  digitalWrite(FAN_PIN, LOW);
  
  // DHT 센서 시작
  dht.begin();
  
  // WiFi 연결
  WiFi.begin(ssid, password);
  Serial.print("WiFi 연결 중");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n스마트 팜 시작!");
}

void loop() {
  // 센서 값 읽기
  int soilMoisture = map(analogRead(SOIL_PIN), 0, 4095, 0, 100);
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int lightLevel = analogRead(LIGHT_PIN);
  
  // Early return: 센서 오류 체크
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("⚠️ DHT 센서 오류");
    delay(2000);
    return;
  }
  
  // 상태 출력
  Serial.println("====== 스마트 팜 상태 ======");
  Serial.printf("토양 습도: %d%%\n", soilMoisture);
  Serial.printf("온도: %.1f°C\n", temperature);
  Serial.printf("습도: %.1f%%\n", humidity);
  Serial.printf("조도: %d\n", lightLevel);
  
  // 자동 제어 로직
  controlWaterPump(soilMoisture);
  controlLED(lightLevel);
  controlFan(temperature);
  
  delay(5000);  // 5초마다 체크
}

// 물펌프 자동 제어
void controlWaterPump(int soilMoisture) {
  if (soilMoisture < SOIL_DRY) {
    digitalWrite(PUMP_PIN, HIGH);
    Serial.println("💧 물펌프 ON - 토양이 건조합니다");
  } else {
    digitalWrite(PUMP_PIN, LOW);
    Serial.println("💧 물펌프 OFF");
  }
}

// LED 조명 자동 제어
void controlLED(int lightLevel) {
  if (lightLevel < LIGHT_LOW) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("💡 LED ON - 조도가 낮습니다");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("💡 LED OFF");
  }
}

// 팬 자동 제어
void controlFan(float temperature) {
  if (temperature > TEMP_HIGH) {
    digitalWrite(FAN_PIN, HIGH);
    Serial.println("🌀 팬 ON - 온도가 높습니다");
  } else {
    digitalWrite(FAN_PIN, LOW);
    Serial.println("🌀 팬 OFF");
  }
}
```

#### 학습 포인트
1. **아날로그 센서 읽기**: `analogRead()` 사용
2. **Early return 패턴**: 센서 오류 시 즉시 종료
3. **함수 분리**: 각 제어 로직을 독립 함수로 모듈화
4. **임계값 기반 제어**: 센서 값에 따른 자동 동작

### 프로젝트 2: 스마트 홈 (IoT 통합) - 6시간

#### 시스템 구성

#### 핵심 코드: 웹 제어 시스템

```cpp
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

// 핀 설정
#define DHT_PIN 4
#define LIGHT_SENSOR_PIN 34
#define MOTION_PIN 5
#define GAS_PIN 35
#define LIGHT_RELAY_PIN 2
#define AC_RELAY_PIN 15

DHT dht(DHT_PIN, DHT22);
WebServer server(80);

// WiFi 설정
const char* ssid = "WiFi_이름";
const char* password = "비밀번호";

// 상태 변수
bool lightStatus = false;
bool acStatus = false;

void setup() {
  Serial.begin(115200);
  
  // 핀 모드 설정
  pinMode(MOTION_PIN, INPUT);
  pinMode(LIGHT_RELAY_PIN, OUTPUT);
  pinMode(AC_RELAY_PIN, OUTPUT);
  
  dht.begin();
  
  // WiFi 연결
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi 연결 완료!");
  Serial.print("웹 주소: http://");
  Serial.println(WiFi.localIP());
  
  // 웹 서버 라우팅 설정
  server.on("/", handleRoot);
  server.on("/light/on", handleLightOn);
  server.on("/light/off", handleLightOff);
  server.on("/ac/on", handleACOn);
  server.on("/ac/off", handleACOff);
  server.on("/status", handleStatus);
  
  server.begin();
  Serial.println("웹 서버 시작!");
}

void loop() {
  server.handleClient();  // 웹 요청 처리
  checkSensors();         // 센서 모니터링
  delay(100);
}

// 메인 페이지 HTML
void handleRoot() {
  String html = R"(
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>스마트 홈 제어</title>
  <style>
    body { font-family: Arial; text-align: center; padding: 20px; }
    .button { padding: 15px 30px; margin: 10px; font-size: 18px; }
    .on { background: #4CAF50; color: white; }
    .off { background: #f44336; color: white; }
    .status { font-size: 20px; margin: 20px; }
  </style>
</head>
<body>
  <h1>🏠 스마트 홈 제어</h1>
  
  <div class='status' id='status'></div>
  
  <h2>💡 조명</h2>
  <button class='button on' onclick="control('/light/on')">켜기</button>
  <button class='button off' onclick="control('/light/off')">끄기</button>
  
  <h2>❄️ 에어컨</h2>
  <button class='button on' onclick="control('/ac/on')">켜기</button>
  <button class='button off' onclick="control('/ac/off')">끄기</button>
  
  <script>
    function control(path) {
      fetch(path).then(() => updateStatus());
    }
    
    function updateStatus() {
      fetch('/status')
        .then(res => res.json())
        .then(data => {
          document.getElementById('status').innerHTML = 
            `온도: ${data.temp}°C | 습도: ${data.humi}% | 
             조명: ${data.light} | 에어컨: ${data.ac}`;
        });
    }
    
    setInterval(updateStatus, 2000);  // 2초마다 업데이트
    updateStatus();
  </script>
</body>
</html>
  )";
  
  server.send(200, "text/html", html);
}

// 조명 켜기
void handleLightOn() {
  digitalWrite(LIGHT_RELAY_PIN, HIGH);
  lightStatus = true;
  server.send(200, "text/plain", "OK");
  Serial.println("💡 조명 ON");
}

// 조명 끄기
void handleLightOff() {
  digitalWrite(LIGHT_RELAY_PIN, LOW);
  lightStatus = false;
  server.send(200, "text/plain", "OK");
  Serial.println("💡 조명 OFF");
}

// 에어컨 켜기
void handleACOn() {
  digitalWrite(AC_RELAY_PIN, HIGH);
  acStatus = true;
  server.send(200, "text/plain", "OK");
  Serial.println("❄️ 에어컨 ON");
}

// 에어컨 끄기
void handleACOff() {
  digitalWrite(AC_RELAY_PIN, LOW);
  acStatus = false;
  server.send(200, "text/plain", "OK");
  Serial.println("❄️ 에어컨 OFF");
}

// 상태 JSON 응답
void handleStatus() {
  float temp = dht.readTemperature();
  float humi = dht.readHumidity();
  
  String json = "{";
  json += "\"temp\":" + String(temp, 1) + ",";
  json += "\"humi\":" + String(humi, 1) + ",";
  json += "\"light\":\"" + String(lightStatus ? "ON" : "OFF") + "\",";
  json += "\"ac\":\"" + String(acStatus ? "ON" : "OFF") + "\"";
  json += "}";
  
  server.send(200, "application/json", json);
}

// 센서 모니터링 (보안 알람)
void checkSensors() {
  static unsigned long lastCheck = 0;
  
  // 1초마다 체크
  if (millis() - lastCheck < 1000) return;
  lastCheck = millis();
  
  // 모션 감지
  if (digitalRead(MOTION_PIN) == HIGH) {
    Serial.println("🚨 모션 감지!");
  }
  
  // 가스 누출 감지
  int gasLevel = analogRead(GAS_PIN);
  if (gasLevel > 2000) {
    Serial.println("🚨 가스 누출 경고!");
    // 알람 동작 추가 가능
  }
}
```

#### 학습 포인트
1. **웹 서버**: ESP32로 HTML 페이지 제공
2. **RESTful API**: /light/on, /status 등 엔드포인트
3. **JSON 응답**: JavaScript와 통신
4. **실시간 업데이트**: setInterval로 자동 갱신

---

### 프로젝트 3: 스마트 팔 (로봇 암) - 4시간

#### 시스템 구성

#### 핵심 코드: 서보 모터 제어

```cpp
#include <ESP32Servo.h>

// 서보 객체
Servo servo1;  // 베이스 (좌우 회전)
Servo servo2;  // 관절 (상하)
Servo servo3;  // 그리퍼 (집기)

// 핀 설정
#define SERVO1_PIN 12
#define SERVO2_PIN 13
#define SERVO3_PIN 14
#define JOY_X_PIN 34
#define JOY_Y_PIN 35
#define BUTTON_PIN 5

// 현재 각도
int angle1 = 90;
int angle2 = 90;
int angle3 = 90;

void setup() {
  Serial.begin(115200);
  
  // 서보 연결
  servo1.attach(SERVO1_PIN);
  servo2.attach(SERVO2_PIN);
  servo3.attach(SERVO3_PIN);
  
  // 버튼 핀
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // 초기 위치
  moveToPosition(angle1, angle2, angle3);
  
  Serial.println("스마트 팔 준비 완료!");
}

void loop() {
  // 조이스틱 값 읽기 (0~4095)
  int joyX = analogRead(JOY_X_PIN);
  int joyY = analogRead(JOY_Y_PIN);
  bool buttonPressed = digitalRead(BUTTON_PIN) == LOW;
  
  // 조이스틱 제어 (X축: 베이스 회전)
  if (joyX < 1500) {
    angle1 = constrain(angle1 - 2, 0, 180);
  } else if (joyX > 2500) {
    angle1 = constrain(angle1 + 2, 0, 180);
  }
  
  // 조이스틱 제어 (Y축: 관절)
  if (joyY < 1500) {
    angle2 = constrain(angle2 - 2, 0, 180);
  } else if (joyY > 2500) {
    angle2 = constrain(angle2 + 2, 0, 180);
  }
  
  // 버튼: 그리퍼 열기/닫기
  if (buttonPressed) {
    angle3 = (angle3 == 90) ? 45 : 90;  // 토글
    delay(300);  // 디바운스
  }
  
  // 서보 이동
  moveToPosition(angle1, angle2, angle3);
  
  Serial.printf("각도: %d, %d, %d\n", angle1, angle2, angle3);
  delay(50);
}

// 부드러운 이동
void moveToPosition(int a1, int a2, int a3) {
  servo1.write(a1);
  servo2.write(a2);
  servo3.write(a3);
}
```

### 프로젝트 4: 스마트 카 (자율 주행) - 4시간

#### 시스템 구성

#### 핵심 코드: 장애물 회피

```cpp
#include <ESP32Servo.h>

// 핀 설정
#define TRIG_PIN 5
#define ECHO_PIN 18
#define MOTOR_A1 12
#define MOTOR_A2 13
#define MOTOR_B1 14
#define MOTOR_B2 15
#define SPEED_A 25
#define SPEED_B 26

void setup() {
  Serial.begin(115200);
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MOTOR_A1, OUTPUT);
  pinMode(MOTOR_A2, OUTPUT);
  pinMode(MOTOR_B1, OUTPUT);
  pinMode(MOTOR_B2, OUTPUT);
  
  // PWM 설정
  ledcSetup(0, 5000, 8);
  ledcSetup(1, 5000, 8);
  ledcAttachPin(SPEED_A, 0);
  ledcAttachPin(SPEED_B, 1);
  
  Serial.println("스마트 카 시작!");
}

void loop() {
  int distance = getDistance();
  
  Serial.printf("거리: %d cm\n", distance);
  
  // Early return: 센서 오류
  if (distance == 0) {
    stopMotor();
    return;
  }
  
  // 장애물 회피 로직
  if (distance > 30) {
    moveForward(200);  // 전진
  } else if (distance > 15) {
    moveForward(100);  // 천천히
  } else {
    // 장애물 가까움: 회피
    stopMotor();
    delay(500);
    moveBackward(150);
    delay(500);
    turnRight(150);
    delay(700);
  }
}

// 거리 측정
int getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return 0;
  
  return duration * 0.034 / 2;
}

// 모터 제어 함수들
void moveForward(int speed) {
  digitalWrite(MOTOR_A1, HIGH);
  digitalWrite(MOTOR_A2, LOW);
  digitalWrite(MOTOR_B1, HIGH);
  digitalWrite(MOTOR_B2, LOW);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
}

void moveBackward(int speed) {
  digitalWrite(MOTOR_A1, LOW);
  digitalWrite(MOTOR_A2, HIGH);
  digitalWrite(MOTOR_B1, LOW);
  digitalWrite(MOTOR_B2, HIGH);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
}

void turnRight(int speed) {
  digitalWrite(MOTOR_A1, HIGH);
  digitalWrite(MOTOR_A2, LOW);
  digitalWrite(MOTOR_B1, LOW);
  digitalWrite(MOTOR_B2, HIGH);
  ledcWrite(0, speed);
  ledcWrite(1, speed);
}

void stopMotor() {
  ledcWrite(0, 0);
  ledcWrite(1, 0);
}
```

### 프로젝트 5: 무인 차단기 (출입 관리) - 4시간

#### 시스템 구성

#### 핵심 코드: 자동 개폐

```cpp
#include <ESP32Servo.h>

Servo gate;

#define SERVO_PIN 12
#define TRIG_PIN 5
#define ECHO_PIN 18
#define LED_GREEN 2
#define LED_RED 15

bool gateOpen = false;

void setup() {
  Serial.begin(115200);
  
  gate.attach(SERVO_PIN);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  
  gate.write(0);  // 초기: 닫힘
  digitalWrite(LED_RED, HIGH);
  
  Serial.println("무인 차단기 준비!");
}

void loop() {
  int distance = getDistance();
  
  // Early return: 범위 밖
  if (distance > 100 || distance == 0) {
    closeGate();
    return;
  }
  
  // 차량 감지 (30cm 이내)
  if (distance < 30) {
    Serial.println("🚗 차량 감지!");
    openGate();
    delay(3000);  // 3초 대기
  } else {
    closeGate();
  }
  
  delay(100);
}

void openGate() {
  if (gateOpen) return;  // 이미 열림
  
  Serial.println("🚧 차단기 열기");
  gate.write(90);
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_RED, LOW);
  gateOpen = true;
}

void closeGate() {
  if (!gateOpen) return;  // 이미 닫힘
  
  Serial.println("🚧 차단기 닫기");
  gate.write(0);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, HIGH);
  gateOpen = false;
}

int getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return 0;
  
  return duration * 0.034 / 2;
}
```

---

## 🥧 2단계: 라즈베리파이 + AI 비전 (32시간)

### 라즈베리파이 vs ESP32

| 비교 | ESP32 | 라즈베리파이 |
|------|-------|------------|
| **OS** | 없음 (펌웨어) | Linux (Raspberry Pi OS) |
| **처리 능력** | 단순 제어 | 복잡한 연산, AI 추론 |
| **카메라** | 단순 스트리밍 | OpenCV, YOLO 가능 |
| **개발** | Arduino IDE | Python, 다양한 라이브러리 |
| **가격** | $5-10 | $50-80 |
| **용도** | IoT 센서 노드 | AI 엣지 컴퓨팅 |

### 2단계 학습 목표

1. **OpenCV2**: 이미지 처리 및 컴퓨터 비전
2. **YOLO**: 실시간 객체 인식
3. **복잡한 시스템**: 다중 센서, AI, 통신 통합
4. **실제 배포**: 안정적인 24/7 동작

### 차시별 세부 계획

| 차시 | 주제 | 핵심 기술 | 프로젝트 | 시간 |
|------|------|----------|---------|------|
| **1-2차시** | 라즈베리파이 기초 | Linux, Python, GPIO | LED 제어 | 4시간 |
| **3-4차시** | OpenCV2 입문 | 이미지 처리, 얼굴 인식 | 보안 카메라 | 4시간 |
| **5-6차시** | YOLO 객체 인식 | YOLOv5, 추론 | 물체 감지 | 4시간 |
| **7-8차시** | 시스템 통합 | 다중 센서, AI | - | 4시간 |
| **9-11차시** | 프로젝트 1-3 | 스마트 팜, 홈, 팔 + AI | 완성품 | 6시간 |
| **12-16차시** | 프로젝트 4-5 | 스마트 카, 차단기 + AI | 완성품 | 10시간 |

### 핵심 기술 1: OpenCV2 마스터

#### OpenCV2 설치 및 기초

```bash
# 라즈베리파이에서 실행
sudo apt update
sudo apt install python3-opencv python3-pip
pip3 install opencv-python opencv-contrib-python
```

#### 실습: 얼굴 인식 출입 시스템

```python
# face_detection_system.py
import cv2
import RPi.GPIO as GPIO
import time
from datetime import datetime

# GPIO 설정
LED_GREEN = 17  # 출입 허가
LED_RED = 27    # 출입 거부
RELAY_PIN = 22  # 도어락

GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_GREEN, GPIO.OUT)
GPIO.setup(LED_RED, GPIO.OUT)
GPIO.setup(RELAY_PIN, GPIO.OUT)

# 초기 상태: 문 잠김
GPIO.output(RELAY_PIN, GPIO.LOW)
GPIO.output(LED_RED, GPIO.HIGH)

# 얼굴 인식 모델 로드
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# 카메라 초기화
camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

def log_access(name, status):
    """출입 로그 기록"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open('access_log.txt', 'a') as f:
        f.write(f"[{timestamp}] {name} - {status}\n")
    print(f"[LOG] {timestamp} - {name}: {status}")

def unlock_door():
    """도어 열기"""
    GPIO.output(LED_GREEN, GPIO.HIGH)
    GPIO.output(LED_RED, GPIO.LOW)
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    print("🚪 문 열림")
    time.sleep(3)  # 3초 대기
    lock_door()

def lock_door():
    """도어 잠금"""
    GPIO.output(LED_GREEN, GPIO.LOW)
    GPIO.output(LED_RED, GPIO.HIGH)
    GPIO.output(RELAY_PIN, GPIO.LOW)
    print("🔒 문 잠김")

print("얼굴 인식 출입 시스템 시작...")

try:
    while True:
        # 프레임 읽기
        ret, frame = camera.read()
        
        # Early return: 카메라 오류
        if not ret:
            print("⚠️ 카메라 오류")
            continue
        
        # 그레이스케일 변환
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # 얼굴 검출
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(50, 50)
        )
        
        # 얼굴 발견 시
        if len(faces) > 0:
            print(f"✅ {len(faces)}명 감지")
            
            # 첫 번째 얼굴 처리
            (x, y, w, h) = faces[0]
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
            
            # 출입 허가
            log_access("사용자", "출입")
            unlock_door()
        
        # 화면 표시 (선택사항)
        # cv2.imshow('Access Control', frame)
        
        # 'q' 키로 종료
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
        time.sleep(0.1)

except KeyboardInterrupt:
    print("\n시스템 종료")

finally:
    camera.release()
    cv2.destroyAllWindows()
    GPIO.cleanup()
```

### 핵심 기술 2: YOLO 객체 인식

#### YOLO (You Only Look Once)

#### 실습: YOLOv5로 실시간 객체 인식

```bash
# YOLOv5 설치
git clone https://github.com/ultralytics/yolov5
cd yolov5
pip3 install -r requirements.txt
```

```python
# yolo_detection.py
import torch
import cv2
import RPi.GPIO as GPIO

# GPIO 설정
ALERT_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(ALERT_PIN, GPIO.OUT)

# YOLO 모델 로드 (사전 학습된 모델)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
model.conf = 0.5  # 신뢰도 임계값 50%

# 카메라 초기화
camera = cv2.VideoCapture(0)

print("YOLO 객체 인식 시작...")

try:
    while True:
        # 프레임 읽기
        ret, frame = camera.read()
        
        # Early return: 카메라 오류
        if not ret:
            print("⚠️ 카메라 오류")
            continue
        
        # YOLO 추론
        results = model(frame)
        
        # 결과 파싱
        detections = results.pandas().xyxy[0]
        
        # 특정 객체 감지 (예: 사람)
        person_detected = False
        for _, row in detections.iterrows():
            class_name = row['name']
            confidence = row['confidence']
            
            if class_name == 'person':
                person_detected = True
                print(f"🚶 사람 감지! (신뢰도: {confidence:.2f})")
        
        # 알림 제어
        if person_detected:
            GPIO.output(ALERT_PIN, GPIO.HIGH)
        else:
            GPIO.output(ALERT_PIN, GPIO.LOW)
        
        # 결과 이미지에 표시
        result_img = results.render()[0]
        cv2.imshow('YOLO Detection', result_img)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

except KeyboardInterrupt:
    print("\n종료")

finally:
    camera.release()
    cv2.destroyAllWindows()
    GPIO.cleanup()
```

---

## 🚀 2단계: 5대 프로젝트 AI 통합 (26시간)

### 프로젝트 1: 스마트 카 (자율 주행) - 8시간

#### 시스템 구성: ESP32 → 라즈베리파이 업그레이드

#### 핵심 코드: YOLO 기반 자율 주행

```python
# autonomous_car.py
import cv2
import torch
import RPi.GPIO as GPIO
import numpy as np

# GPIO 핀 설정
MOTOR_A1, MOTOR_A2 = 17, 27
MOTOR_B1, MOTOR_B2 = 22, 23
SPEED_A, SPEED_B = 18, 19

# GPIO 초기화
GPIO.setmode(GPIO.BCM)
for pin in [MOTOR_A1, MOTOR_A2, MOTOR_B1, MOTOR_B2]:
    GPIO.setup(pin, GPIO.OUT)

# PWM 설정
pwm_a = GPIO.PWM(SPEED_A, 1000)
pwm_b = GPIO.PWM(SPEED_B, 1000)
pwm_a.start(0)
pwm_b.start(0)

# YOLO 모델 로드
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
model.conf = 0.6

# 카메라 초기화
camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

def move_forward(speed=50):
    """전진"""
    GPIO.output(MOTOR_A1, GPIO.HIGH)
    GPIO.output(MOTOR_A2, GPIO.LOW)
    GPIO.output(MOTOR_B1, GPIO.HIGH)
    GPIO.output(MOTOR_B2, GPIO.LOW)
    pwm_a.ChangeDutyCycle(speed)
    pwm_b.ChangeDutyCycle(speed)

def stop():
    """정지"""
    pwm_a.ChangeDutyCycle(0)
    pwm_b.ChangeDutyCycle(0)

def turn_left(speed=40):
    """좌회전"""
    GPIO.output(MOTOR_A1, GPIO.LOW)
    GPIO.output(MOTOR_A2, GPIO.HIGH)
    GPIO.output(MOTOR_B1, GPIO.HIGH)
    GPIO.output(MOTOR_B2, GPIO.LOW)
    pwm_a.ChangeDutyCycle(speed)
    pwm_b.ChangeDutyCycle(speed)

def turn_right(speed=40):
    """우회전"""
    GPIO.output(MOTOR_A1, GPIO.HIGH)
    GPIO.output(MOTOR_A2, GPIO.LOW)
    GPIO.output(MOTOR_B1, GPIO.LOW)
    GPIO.output(MOTOR_B2, GPIO.HIGH)
    pwm_a.ChangeDutyCycle(speed)
    pwm_b.ChangeDutyCycle(speed)

def analyze_objects(detections):
    """객체 분석 및 주행 판단"""
    # Early return: 객체 없음
    if len(detections) == 0:
        return "forward"
    
    # 위험 객체 감지
    for _, obj in detections.iterrows():
        class_name = obj['name']
        x_center = (obj['xmin'] + obj['xmax']) / 2
        distance = obj['ymax'] - obj['ymin']  # 크기로 거리 추정
        
        # 사람 감지 → 즉시 정지
        if class_name == 'person' and distance > 200:
            return "stop"
        
        # 장애물 감지 → 회피
        if class_name in ['car', 'truck', 'chair']:
            if distance > 150:
                # 객체가 왼쪽에 있으면 우회전
                if x_center < 320:
                    return "right"
                else:
                    return "left"
    
    return "forward"

print("자율 주행 시작...")

try:
    while True:
        # 프레임 읽기
        ret, frame = camera.read()
        
        # Early return: 카메라 오류
        if not ret:
            stop()
            continue
        
        # YOLO 추론
        results = model(frame)
        detections = results.pandas().xyxy[0]
        
        # 주행 판단
        action = analyze_objects(detections)
        
        # 동작 실행
        if action == "forward":
            move_forward(50)
            print("🚗 전진")
        elif action == "stop":
            stop()
            print("🛑 정지 (사람 감지)")
        elif action == "left":
            turn_left(40)
            print("↶ 좌회전")
        elif action == "right":
            turn_right(40)
            print("↷ 우회전")
        
        # 결과 화면 표시 (디버깅용)
        # result_img = results.render()[0]
        # cv2.imshow('Autonomous Car', result_img)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

except KeyboardInterrupt:
    print("\n자율 주행 종료")

finally:
    stop()
    camera.release()
    cv2.destroyAllWindows()
    GPIO.cleanup()
```

### 프로젝트 2: 무인 차단기 (번호판 인식) - 8시간

#### 시스템 구성: ESP32 → 라즈베리파이 업그레이드

#### 핵심 코드: OCR 번호판 인식

```python
# smart_gate.py
import cv2
import pytesseract
import RPi.GPIO as GPIO
from datetime import datetime
import sqlite3

# GPIO 설정
SERVO_PIN = 18
LED_GREEN = 23
LED_RED = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO_PIN, GPIO.OUT)
GPIO.setup(LED_GREEN, GPIO.OUT)
GPIO.setup(LED_RED, GPIO.OUT)

servo = GPIO.PWM(SERVO_PIN, 50)
servo.start(0)

# 데이터베이스 초기화
db = sqlite3.connect('gate_access.db')
cursor = db.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS access_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plate TEXT,
        timestamp TEXT,
        status TEXT
    )
''')
db.commit()

# 허가된 차량 리스트
ALLOWED_PLATES = ['12가3456', '34나5678', '56다7890']

# 카메라 초기화
camera = cv2.VideoCapture(0)

def preprocess_plate(image):
    """번호판 전처리"""
    # 그레이스케일 변환
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # 노이즈 제거
    denoised = cv2.fastNlMeansDenoising(gray)
    
    # 적응형 이진화
    binary = cv2.adaptiveThreshold(
        denoised, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY, 11, 2
    )
    
    return binary

def extract_plate_number(image):
    """OCR로 번호판 추출"""
    # 전처리
    processed = preprocess_plate(image)
    
    # OCR 실행 (한글 지원)
    custom_config = r'--oem 3 --psm 7 -c tessedit_char_whitelist=0123456789가나다라마바사아자거너더러머버서어저고노도로모보소오조구누두루무부수우주'
    text = pytesseract.image_to_string(
        processed,
        lang='kor',
        config=custom_config
    )
    
    # 공백 제거 및 정리
    plate = text.strip().replace(' ', '')
    return plate

def open_gate():
    """차단기 열기"""
    servo.ChangeDutyCycle(7.5)  # 90도
    GPIO.output(LED_GREEN, GPIO.HIGH)
    GPIO.output(LED_RED, GPIO.LOW)
    print("🚧 차단기 열림")

def close_gate():
    """차단기 닫기"""
    servo.ChangeDutyCycle(2.5)  # 0도
    GPIO.output(LED_GREEN, GPIO.LOW)
    GPIO.output(LED_RED, GPIO.HIGH)
    print("🚧 차단기 닫힘")

def log_access(plate, status):
    """출입 로그 기록"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute(
        "INSERT INTO access_log (plate, timestamp, status) VALUES (?, ?, ?)",
        (plate, timestamp, status)
    )
    db.commit()
    print(f"[LOG] {timestamp} - {plate}: {status}")

# 초기 상태
close_gate()

print("무인 차단기 시작...")

try:
    while True:
        # 프레임 읽기
        ret, frame = camera.read()
        
        # Early return: 카메라 오류
        if not ret:
            continue
        
        # 번호판 인식
        plate_number = extract_plate_number(frame)
        
        # Early return: 번호판 추출 실패
        if len(plate_number) < 7:
            continue
        
        print(f"🚗 번호판 감지: {plate_number}")
        
        # 출입 허가 확인
        if plate_number in ALLOWED_PLATES:
            print("✅ 출입 허가")
            log_access(plate_number, "허가")
            open_gate()
            time.sleep(5)  # 5초 대기
            close_gate()
        else:
            print("❌ 출입 거부")
            log_access(plate_number, "거부")
            # 알림 전송 가능
        
        time.sleep(2)

except KeyboardInterrupt:
    print("\n시스템 종료")

finally:
    close_gate()
    camera.release()
    db.close()
    GPIO.cleanup()
```

### 프로젝트 3: 스마트 팜 (AI 병해충 감지) - 6시간

#### 2단계 업그레이드: 센서 + AI 비전

```python
# smart_farm_ai.py
import cv2
import torch
import RPi.GPIO as GPIO
from datetime import datetime
import json

# 기존 센서 + AI 카메라 통합
PUMP_PIN = 17
LED_PIN = 27
FAN_PIN = 22
DHT_PIN = 4

# YOLO 모델 (병해충 탐지 커스텀 학습)
model = torch.hub.load('ultralytics/yolov5', 'custom', 
                       path='plant_disease_model.pt')

camera = cv2.VideoCapture(0)

def check_plant_health():
    """AI로 식물 건강 체크"""
    ret, frame = camera.read()
    
    # Early return: 카메라 오류
    if not ret:
        return None
    
    # 병해충 탐지
    results = model(frame)
    detections = results.pandas().xyxy[0]
    
    diseases = []
    for _, obj in detections.iterrows():
        disease_name = obj['name']
        confidence = obj['confidence']
        
        if confidence > 0.7:
            diseases.append({
                'name': disease_name,
                'confidence': confidence
            })
    
    return diseases

# 메인 루프에서 주기적으로 체크
```

### 프로젝트 4: 스마트 홈 (얼굴 인식 보안) - 6시간

#### 2단계 업그레이드: Web + 얼굴 인식

```python
# smart_home_security.py
import cv2
import face_recognition
import RPi.GPIO as GPIO
import pickle
import numpy as np

# 등록된 얼굴 DB 로드
with open('known_faces.pkl', 'rb') as f:
    known_face_encodings, known_face_names = pickle.load(f)

camera = cv2.VideoCapture(0)
DOOR_LOCK = 17

def recognize_face(frame):
    """얼굴 인식 및 본인 확인"""
    # 얼굴 위치 찾기
    face_locations = face_recognition.face_locations(frame)
    
    # Early return: 얼굴 없음
    if len(face_locations) == 0:
        return None
    
    # 얼굴 인코딩
    face_encodings = face_recognition.face_encodings(frame, face_locations)
    
    # 등록된 얼굴과 비교
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(
            known_face_encodings, 
            face_encoding,
            tolerance=0.6
        )
        
        # 일치하는 얼굴 찾기
        if True in matches:
            match_index = matches.index(True)
            name = known_face_names[match_index]
            return name
    
    return "Unknown"
```

### 프로젝트 5: 스마트 팔 (CV 기반 좌표 제어) - 6시간

#### 2단계 업그레이드: 색상 추적 자동 집기

```python
# smart_arm_vision.py
import cv2
import RPi.GPIO as GPIO
from servo_controller import ServoArm

arm = ServoArm()
camera = cv2.VideoCapture(0)

def find_red_object(frame):
    """빨간색 물체 찾기"""
    # HSV 색공간 변환
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # 빨간색 범위
    lower_red = np.array([0, 100, 100])
    upper_red = np.array([10, 255, 255])
    
    # 마스크 생성
    mask = cv2.inRange(hsv, lower_red, upper_red)
    
    # 컨투어 찾기
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, 
                                   cv2.CHAIN_APPROX_SIMPLE)
    
    # Early return: 물체 없음
    if len(contours) == 0:
        return None
    
    # 가장 큰 컨투어 선택
    largest_contour = max(contours, key=cv2.contourArea)
    
    # 무게중심 계산
    M = cv2.moments(largest_contour)
    if M["m00"] == 0:
        return None
    
    cx = int(M["m10"] / M["m00"])
    cy = int(M["m01"] / M["m00"])
    
    return (cx, cy)

# 메인: 빨간 물체 자동 추적 및 집기
while True:
    ret, frame = camera.read()
    
    position = find_red_object(frame)
    
    if position:
        x, y = position
        # 좌표를 서보 각도로 변환
        angle1 = map_range(x, 0, 640, 0, 180)
        angle2 = map_range(y, 0, 480, 0, 180)
        
        arm.move_to(angle1, angle2)
        arm.grip()  # 물체 집기
```

---

## 📊 평가 시스템

### 단계별 평가

| 단계 | 평가 항목 | 배점 | 평가 방법 |
|------|----------|------|----------|
| **1단계 (ESP32)** | 프로토타입 완성도 | 40% | 5대 프로젝트 동작 확인 |
| | Serial 디버깅 | 10% | 문제 해결 과정 |
| | Web/App 연동 | 10% | 원격 제어 성공 |
| **2단계 (라즈베리파이)** | AI 모델 통합 | 25% | OpenCV/YOLO 활용 |
| | 시스템 안정성 | 10% | 24시간 테스트 |
| | 최종 발표 | 5% | 프로젝트 설명 |

### 프로젝트 기반 평가

---

## 🛠️ 필요 교구

### 단계별 하드웨어

| 단계 | 메인 보드 | 센서 | 액추에이터 | 카메라 | 예산 |
|------|----------|------|-----------|--------|------|
| **1단계** | ESP32 개발보드 | 온습도, 초음파, 조도 | LED, 서보, DC모터 | ESP32-CAM | $60 |
| **2단계** | 라즈베리파이 4 (4GB) | 복합 센서 | 모터 드라이버, 릴레이 | 카메라 모듈 V2 | $100 |

### 프로젝트별 부품 리스트

#### 스마트 카 (자율 주행)
- ESP32-CAM 또는 라즈베리파이 + 카메라
- L298N 모터 드라이버
- DC 기어 모터 2개
- 초음파 센서 3개
- 샤시, 바퀴, 배터리

#### 스마트 팔 (로봇 암)
- ESP32 또는 라즈베리파이
- MG996R 서보 모터 3개
- 조이스틱 모듈
- 로봇 암 프레임

#### 스마트 홈 (IoT)
- ESP32 + 라즈베리파이
- DHT22 온습도 센서
- PIR 모션 센서
- MQ-2 가스 센서
- 릴레이 모듈 2채널

#### 스마트 팜 (센서 기반)
- ESP32 + 라즈베리파이
- 토양 습도 센서
- DHT22 센서
- 조도 센서
- 5V 물펌프, LED, 팬

#### 무인 차단기 (출입 관리)
- ESP32-CAM 또는 라즈베리파이 + 카메라
- SG90 서보 모터
- 초음파 센서
- LED (녹색/빨간색)

### 추천 학습 키트

---

## 📚 학습 로드맵 요약

---

## 💡 5대 프로젝트 성공 사례

### 1. 스마트 카 (자율 주행)
**1단계 (ESP32)**:
- 초음파 센서 기반 장애물 회피
- 웹으로 원격 조종
- 간단한 라인 트레이싱

**2단계 (라즈베리파이)**:
- YOLO로 사람/차량 인식
- 신호등 색상 인식
- 완전 자율 주행 (실내)

### 2. 무인 차단기 (출입 관리)
**1단계 (ESP32)**:
- 초음파로 차량 감지
- 자동 개폐
- 웹 모니터링

**2단계 (라즈베리파이)**:
- OCR 번호판 인식
- 화이트리스트 DB 관리
- 출입 로그 자동 기록

### 3. 스마트 홈 (IoT 통합)
**1단계 (ESP32)**:
- 온습도/조도/모션 센서
- 웹/앱으로 조명/에어컨 제어
- 실시간 모니터링

**2단계 (라즈베리파이)**:
- 얼굴 인식 보안 시스템
- 침입자 자동 알림
- 음성 제어 통합

### 4. 스마트 팜 (센서 기반)
**1단계 (ESP32)**:
- 토양 습도 자동 급수
- 온도에 따른 팬 제어
- 조도에 따른 LED 조명

**2단계 (라즈베리파이)**:
- AI 병해충 자동 감지
- 생장 데이터 분석
- 최적 환경 자동 제어

### 5. 스마트 팔 (로봇 암)
**1단계 (ESP32)**:
- 조이스틱으로 3축 제어
- 버튼으로 그리퍼 제어
- 위치 패턴 저장/반복

**2단계 (라즈베리파이)**:
- 색상 추적 자동 집기
- 좌표 기반 자동 이동
- 물체 인식 후 분류

---

## 🎓 학습 가이드

### 학생용 체크리스트

#### 1단계 (ESP32) 완료 기준
- [ ] Serial 통신으로 센서 값 확인 가능
- [ ] ESP32-CAM으로 웹 스트리밍 성공
- [ ] Web 또는 App으로 원격 제어 가능
- [ ] 5대 프로젝트 중 3개 이상 프로토타입 완성

#### 2단계 (라즈베리파이) 완료 기준
- [ ] OpenCV2로 얼굴 인식 성공
- [ ] YOLO로 실시간 객체 인식 가능
- [ ] 5대 프로젝트 중 2개 이상 AI 통합 완성
- [ ] 24시간 안정적 동작 테스트 통과

### 교사용 지도 가이드

#### 효과적인 수업 운영
1. **역공부 활용**: 실제 IoT 제품 → 분해 → 원리 이해 → 재구현
2. **AI 도구 활용**: ChatGPT로 코드 생성 → 학생은 이해 + 수정 + 최적화
3. **빠른 프로토타입**: ESP32로 빠르게 만들고 → 라즈베리파이로 업그레이드
4. **모듈형 개발**: 각 기능을 함수로 분리 → 재사용 가능하게 설계

#### 주의사항
- **전기 안전**: 릴레이 사용 시 AC 전원 주의
- **카메라 윤리**: 얼굴 인식 시 개인정보 보호 교육 필수
- **배터리 관리**: 리튬 배터리 과충전/과방전 방지
- **디버깅 습관**: Serial 통신으로 상태 확인 습관화

---

## 📞 문의

**홈페이지**: https://aimakerlab.com  
**이메일**: physical@aimakerlab.com  
**교육 문의**: education@aimakerlab.com

---

## 📝 문서 정보

**최종 업데이트**: 2025-12-29  
**작성자**: AI Maker Lab 피지컬 컴퓨팅팀  
**문서 버전**: 2.0 (ESP32 → 라즈베리파이 단계별 학습)  
**핵심 변경사항**:
- 5대 프로젝트 중심 재구성 (스마트 카, 팜, 홈, 팔, 차단기)
- 1단계 ESP32 (Serial, Camera, Web, App Inventor)
- 2단계 라즈베리파이 (OpenCV2, YOLO)
- 프로토타입 → AI 통합 단계별 학습

