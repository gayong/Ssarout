package com.ssafy.ssaout.result.repository;

import com.ssafy.ssaout.result.domain.Result;
import com.ssafy.ssaout.user.domain.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findAllByUser(User user);
}
