package com.exampleRTH.challengeApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class challengeService {
    //private List< Challenge> challenges= new ArrayList<>();
    private Long nextId= 1L;

    public challengeService() {
    }
    public List<Challenge> getAllchallenges(){
        return challengeRepositoy.findAll();
    }

    @Autowired
    ChallengeRepositoy challengeRepositoy;
    public boolean addChallenge( Challenge challenge){
        if (challenge != null) {
            challenge.setId(nextId++);
            challengeRepositoy.save(challenge);
            return true;
        }else
          return false;
    }

    public Challenge getChallenge(String month) {
        Optional<Challenge> challenge = challengeRepositoy.findByMonthIgnoreCase(month);
        return challenge.orElse(null);
    }

    public boolean updateChallenge(Long id, Challenge updatedChallenge) {
        Optional<Challenge> challenge= challengeRepositoy.findById(id);
        if(challenge.isPresent()){
            Challenge updateChallenge = challenge.get();
            updateChallenge.setMonth(updatedChallenge.getMonth());
            updateChallenge.setDescription(updatedChallenge.getDescription());
            challengeRepositoy.save(updateChallenge);
            return true;
        }
        return false;
    }

    public boolean deleteChallenge(Long id) {
        Optional<Challenge> challenge= challengeRepositoy.findById(id);
        if(challenge.isPresent()){
            challengeRepositoy.deleteById(id);
            return true;
        }
        return  false;
    }
}
