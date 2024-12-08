package com.exampleRTH.challengeApp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeRepositoy extends JpaRepository<Challenge, Long> {//<object, primary key> types
    Optional<Challenge> findByMonthIgnoreCase(String month);
}
