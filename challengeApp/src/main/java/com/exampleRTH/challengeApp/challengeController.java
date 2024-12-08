package com.exampleRTH.challengeApp;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/challenges")
@CrossOrigin(origins = "http://localhost:3000")
public class challengeController {
    private challengeService challenge_Service;

    public challengeController(challengeService challenge_Service) {
        this.challenge_Service = challenge_Service;
    }

    @GetMapping
    public List<Challenge> getAllchallenges(){
        return challenge_Service.getAllchallenges();
    }

    @PostMapping
    public ResponseEntity<String> addChallenge(@RequestBody Challenge challenge){
        if (challenge_Service.addChallenge(challenge))
            return new ResponseEntity<>("challenge add successfully",HttpStatus.OK);
        else
            return new ResponseEntity<>("challenge not added",HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{month}")
    public ResponseEntity<Challenge> getChallenge(@PathVariable String month){
        Challenge challenge = challenge_Service.getChallenge(month);
        if(challenge != null){
            return new ResponseEntity<>(challenge, HttpStatus.OK);
        }else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateChallenge(@PathVariable Long id,@RequestBody Challenge updatedChallenge){
        boolean isUpdated= challenge_Service.updateChallenge(id,updatedChallenge);
        if (isUpdated)
            return new ResponseEntity<>("challenge updated successfully",HttpStatus.OK);
        else
            return new ResponseEntity<>("challenge not updated",HttpStatus.NOT_FOUND);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChallenege(@PathVariable Long id){
        boolean isDeleted= challenge_Service.deleteChallenge(id);
        if (isDeleted)
            return new ResponseEntity<>("challenge deleted successfully",HttpStatus.OK);
        else
            return new ResponseEntity<>("challenge not deleted",HttpStatus.NOT_FOUND);

    }

}
