---
layout: post
title: "구분자(Delimiter)"
description:
headline:
modified: 2020-03-19
category: mysql
tags: [mysql, database]
imagefeature: 
mathjax:
chart:
comments: true
featured: true
---

## Delimiter (구분자) 

MySQL 에서 Stored Procedure, Function, Trigger를 작성 하다 보면 항상 따라 붙는 명령어가 있습니다. <br>
바로 DELIMITER $$ 명령어 입니다.<br>

```
// example Procedure 코드

DELIMITER $$
 
CREATE PROCEDURE sp_name()
BEGIN
  -- statements
END $$
 
DELIMITER ;

```

그래서 MySQL 의 여러가지를 정리 하기 전에 구분문자 먼저 정리를 해보겠습니다.

#### 정의

Delimiter 자체를 한글로 번역하면 구분자, 구분문자 입니다.<br>
그리고 이 구분자는 MySQL 에서만 사용하는것이 아닌 여러가지 프로그래밍 에서 사용을 합니다.<br>
ex) CSV - 쉼표, HTML 태그 - 꺽쇠, Java - 세미콜론


MySQL 에서도 구분문자로 ;(세미콜론)을 사용하고있습니다.<br>
예시로 코드를 작성하고 확인하기 위해 delimiter_table, test_table을 2개 만들었습니다.<br>
그리고 SQLyog 에서 쿼리문을 실행해 보겠습니다.<br>

```

SELECT * FROM delimiter_table;

SELECT * FROM test_table;

```

위의 쿼리문은 database에 delimiter_table 과 test_table을 select 하는 2개의 쿼리문입니다.<br>
당연히 실행도 2개가 되고 결과 값도 2개가 되게 되죠<br>
밑에 실행결과의 이미지를 보면 알수있습니다<br>

- 이미지<br>
	<img src="{{ site.url }}/images/20-03-19-delimiter/delimiter1.png" width="450">

그렇습니다. 구분자 ;는 select * from delimiter_table 쿼리문 과 select * from test_table을 구분해주는 역활을 합니다.<br>


#### MySQL 에서의 DELIMITER 명령어

MySQL에서는 ; 으로 구분자를 사용한다는 것을 알게되었습니다.<br>
그런데 example Procedure 코드에서 봤던 DELIMITER 명령어는 뭘까요? <br>
이 DELIMITER 쿼리는 ; 으로 되어있는 구분자를 다른 문자로 재정의 하는 쿼리입니다.<br>

mysqltutorial 에 따르면 쿼리문은<br>
DELIMITER delimiter_character<br>
이렇게 사용합니다. delimiter_character은 자유롭게 구분자를 사용할수있죠<br>

그러면 바로 코드와 함께 알아보도록 하죠

```

DELIMITER $$

SELECT * FROM delimiter_table;

SELECT * FROM test_table;

```

- 이미지<br>
	<img src="{{ site.url }}/images/20-03-19-delimiter/delimiter2.png" width="450">

오류가 발생했습니다.<br>
그 이유는 1번째 라인에서 구분자를 바꾸어 주었기 때문에 더이상<br>
; 은 구분자가 아니라 syntax 에러가 발생하게 되었죠<br>
그러면 $$ 로 구분자가 바뀌었는지 쿼리문을 바꿔 다시 실행해 보겠습니다.

```

DELIMITER $$

SELECT * FROM delimiter_table$$

SELECT * FROM test_table$$

```

- 이미지<br>
	<img src="{{ site.url }}/images/20-03-19-delimiter/delimiter3.png" width="450">

예상과 같이 문제 없이 2개의 쿼리가 실행이 됩니다.

자 그러면 제가 정의 하고 싶은 문자가 가능한지 한번더 테스트 해보겟습니다.<br>

```

DELIMITER //

SELECT * FROM delimiter_table//

SELECT * FROM test_table//

```

- 이미지<br>
	<img src="{{ site.url }}/images/20-03-19-delimiter/delimiter4.png" width="450">

결과는 전과 같습니다. 이상없이 // 로 구분자가 바뀌어 쿼리가 2개 실행이 됩니다.<br>

그러면 다시 한번 정리를 해볼까요<br>
1. DELIMITER 문은 구분자로 기본으로 설정된 ; 를 바꿔주는 쿼리문 이다.<br>
2. 쿼리문은 DELIMITER delimiter_character 로 사용할수있다.<br>
3. delimiter_character 는 정의하고 싶은 문자를 넣으면 가능하다.

#### MySQL 에서의 DELIMITER 를 사용하는 이유

일반적으로 쿼리문을 실행 할때는 구분자를 변경 할 이유가없습니다<br>
괜히 구분자를 바꿔서 다른 개발자가 그 쿼리문을 봤을때 혼동이 오게되겠죠<br>
하지만 MySQL 에서의 Stored Procedure, Function, Trigger 를 사용하려면 DELIMITER를 사용해야 하는 순간이옵니다.<br>
자 그 이유를 알아보기 위해 맨처음 example Procedure 코드에 select * 쿼리문 2개를 넣어보겠습니다.

```

DELIMITER $$
 
CREATE PROCEDURE sp_name()
BEGIN
	SELECT * FROM delimiter_table;
	SELECT * FROM test_table;
END $$
 
DELIMITER ;

```

위의 코드는 Procedure 를 생성하는 쿼리문 입니다. (추후 다른 포스트에서 프로시저는 상세히 알아보겠습니다.)<br>
이 예시의 코드 에서는 구분자를 $$ 로 바꾸었다가 다시 ; 로 바꾸게 됩니다.<br>
구분자를 재정의 하는 이유를 알아보기 위해<br>
DELIMITER로 구분자를 재정의 하지 않고 프로시저를 생성해 보겠습니다.<br>

```

CREATE PROCEDURE sp_name()
BEGIN
  	SELECT * FROM delimiter_table;
	SELECT * FROM test_table;
END;
 
```

- 이미지<br>
	<img src="{{ site.url }}/images/20-03-19-delimiter/delimiter5.png">

1개의 성공 2개의 에러가 발생하였습니다.<br>
보기 쉽게 구분자 별로 쿼리를 나눠보겠습니다.

```

CREATE PROCEDURE sp_name()
BEGIN
  	SELECT * FROM delimiter_table;
	// syntax 에러

	SELECT * FROM test_table;
	// select * 쿼리문

END;
// syntax 에러
 
```

1개의 프로시저를 만드는 쿼리가 아닌 syntax가 맞지 않는 쿼리이기 때문에 오류가 발생을 하였습니다.<br>
그렇기 떄문에 잠시 구분자를 다른 문자로 바꾸는 것입니다.<br>
다시 example Procedure 코드를 실행해 보고 DELIMITER로 구분자를 재정의 하는 이유를 알아봅시다.

```

DELIMITER $$
 
CREATE PROCEDURE sp_name()
BEGIN
	SELECT * FROM delimiter_table;
	SELECT * FROM test_table;
END $$
 
DELIMITER ;

```

- 이미지<br>
	<img src="{{ site.url }}/images/20-03-19-delimiter/delimiter6.png">

성공적으로 쿼리문이 실행이 되었고 프로시저가 생성 되었습니다.<br>
그러면 과정을 순서로 나누어 봅시다<br>

1. 구분자를 $$ 로 선언한다.
2. 구분자가 $$ 로 변경 되었기 때문에 프로시저 중간의 ; 문은 구분자가 아니라 문자열로 프로시저가 생성이 됩니다.
3. END $$ 로 하나의 프로시저를 정의합니다.
4. 다시 DELIMITER ; 로 구분자를 ; 콜론으로 정의합니다.
5. sp_name() 프로시저를 호출하면 구분자가 다시 ; 으로 바뀌었기 때문에 문제없이 1개의 프로시저 실행으로 2개의 쿼리문을 실행할수있다.

#### 정리

이렇게 DELIMITER와 사용하는 이유를 알아보았습니다.<br>
그러면 이제 다음 포스트에서 Stored Procedure, Function, Trigger 각각을 정의하며 하나씩 습득해보겠습니다.<br>

#### 참고 사이트

* [mysql tutorial](https://www.mysqltutorial.org/mysql-stored-procedure/mysql-delimiter/)