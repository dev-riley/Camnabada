package com.security.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.security.auth.model.User;

//jparepository 상속받아서 @repository 없이도 컴포넌트 스캔됨
public interface UserRepository extends JpaRepository<User, Integer>{
	User findById(String name);//아이디로 찾기
	List<User> findByNickname(String nickname);//닉네임으로 모두 찾기
	List<User> findByNicknameLike(String nickname);//닉네임으로 모두 찾기
}
