package com.obss.movietracker.springwebservice.Controller.Admin;

import com.obss.movietracker.springwebservice.Model.DirectorEntity;
import com.obss.movietracker.springwebservice.Model.MovieEntity;
import com.obss.movietracker.springwebservice.Notifications.Messages.ErrorMessage;
import com.obss.movietracker.springwebservice.Notifications.Messages.InfoMessage;
import com.obss.movietracker.springwebservice.Service.DirectorService;
import com.obss.movietracker.springwebservice.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin/director")
public class DirectorController {

    @Autowired
    private DirectorService directorService;

    @Autowired
    private MovieService movieService;

    // GET DIRECTOR OR DIRECTORS
    @GetMapping
    public ResponseEntity<?> getDirectors(@RequestParam(required = false, name = "director") String directorName) {

        List<DirectorEntity> directors = directorService.getDirectorByName(directorName);

        if (directors.size() == 0) {
            return new ResponseEntity<>(directorService.getDirectors(), HttpStatus.OK);
        }

        return new ResponseEntity<>(directors, HttpStatus.OK);
    }

    // POST DIRECTOR
    @PostMapping
    public ResponseEntity<?> createDirector(@RequestBody DirectorEntity director) {

        if (director.getName() == null || director.getSurname() == null) {
            return new ResponseEntity<>(new ErrorMessage("Please fill fields"), HttpStatus.BAD_REQUEST);
        }

        if (!directorService.updateDirector(director)) {
            return new ResponseEntity<>(new ErrorMessage("Director Creation failed"), HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>(director, HttpStatus.CREATED);
    }

    // UPDATE DIRECTOR
    @PutMapping("/{directorId}")
    public ResponseEntity<?> updateDirector(@PathVariable Long directorId, @RequestBody DirectorEntity directorObj) {

        String directorName = directorObj.getName();
        String surname = directorObj.getSurname();
        Date birthDate = directorObj.getBirthDate();

        if (directorName == null || surname == null || birthDate == null) {
            return new ResponseEntity<>(new ErrorMessage("Please fill the form"), HttpStatus.BAD_REQUEST);
        }

        DirectorEntity director = directorService.getDirectorById(directorId);

        if (director == null) {
            return new ResponseEntity<>(new InfoMessage("Director was not found"), HttpStatus.NOT_FOUND);
        }

        director.setName(directorName);
        director.setSurname(surname);
        director.setBirthDate(birthDate);

        if (!directorService.updateDirector(directorObj)) {
            return new ResponseEntity<>(new ErrorMessage("Update failed!"), HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>(director, HttpStatus.OK);
    }

    // DELETE DIRECTOR
    @DeleteMapping("/{directorId}")
    public ResponseEntity<?> deleteDirector(@PathVariable Long directorId) {
        if (directorService.deleteDirector(directorId)) {
            return new ResponseEntity<>(new InfoMessage("Successfully deleted"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ErrorMessage("Director was not deleted"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{directorId}/movies")
    public ResponseEntity<?> getDirectorMovies(@PathVariable Long directorId) {
        List<MovieEntity> directorMovies = movieService.getDirectorsMovies(directorId);

        if (directorMovies == null) {
            return new ResponseEntity<>(new ErrorMessage("Director or movies not found"), HttpStatus.BAD_REQUEST);
        }

        if (directorMovies.size() == 0) {
            return new ResponseEntity<>(new InfoMessage("No movies directed by this director"), HttpStatus.OK);
        }

        return new ResponseEntity<>(directorMovies, HttpStatus.OK);
    }
}
