package com.ssafy.ssaout.song.repository;

import com.ssafy.ssaout.song.domain.Song;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface SongRepository extends JpaRepository<Song, Long> {

    @Modifying
    @Query("select s from Song s where (s.singer like %:keyword% or s.title like %:keyword%) and s.onlyTraining = false")
    List<Song> findAllBySingerOrTitleAndOnlyTrainingIsFalse(@Param("keyword") String keyword);

    @Modifying
    @Query("update Song s set s.view = s.view + 1 where s.songId = :songId")
    void updateViews(@Param("songId") Long songId);

}
