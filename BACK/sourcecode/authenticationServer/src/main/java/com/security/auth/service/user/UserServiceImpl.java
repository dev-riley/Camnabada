package com.security.auth.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.security.auth.model.User;
import com.security.auth.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepo;
	
	@Override
	public boolean sign(User user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		User signUser = new User();
		
		signUser.setEmail(user.getEmail());
		signUser.setId(user.getId());
		signUser.setIntro(user.getIntro());
		signUser.setNickname(user.getNickname());
		signUser.setPassword(encoder.encode(user.getPassword()));
		signUser.setPhoto(user.getPhoto());
		signUser.setUsername(user.getUsername());
		userRepo.save(signUser);
		
		return true;
	}

	@Override
	public boolean login(String id, String password) {
		User loginUser = userRepo.findById(id);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if(encoder.matches(password,loginUser.getPassword()) && loginUser.getId().equals(id)) {
			return true;
		}
		else return false;
	}

	@Override
	public boolean delete(String id) {
		if(userRepo.findById(id) != null) {
			userRepo.delete(userRepo.findById(id));
			return true;
		}
		else return false;
	}

	@Override
	public boolean update(String id, User user) {
		User updateUser = userRepo.findById(id);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if(updateUser != null) {
			if(user.getEmail() != null) 
				updateUser.setEmail(user.getEmail());
			if(user.getIntro() != null)
				updateUser.setIntro(user.getIntro());
			if(user.getNickname() != null)
				updateUser.setNickname(user.getNickname());
			if(user.getPhoto() != null)
				updateUser.setPhoto(user.getPhoto());
			if(user.getUsername() != null)
				updateUser.setUsername(user.getUsername());
			if(user.getPassword() != null)
				updateUser.setPassword(encoder.encode(user.getPassword()));
			
			userRepo.save(updateUser);
			return true;
		}
		else return false;
	}

	@Override
	public List<User> list(String nickname) {
		List<User> user = userRepo.findByNickname(nickname);
		return user;
	}

	@Override
	public boolean valid(String id) {
		User user = userRepo.findById(id);
		if(user != null)
			return false;
		else return true;
	}

	@Override
	public List<User> search(String word) {
		List<User> user = userRepo.findByNicknameLike("%" + word + "%");
		return user;
	}

	@Override
	public String getNickname(String clientId) {
		try {
			User user = userRepo.findById(clientId);
			return user.getNickname();
		} catch (Exception e) {
			return null;
		}
	}
}
