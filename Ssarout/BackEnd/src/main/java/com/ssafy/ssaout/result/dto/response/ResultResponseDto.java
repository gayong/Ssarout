package com.ssafy.ssaout.result.dto.response;

import com.ssafy.ssaout.result.domain.Result;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ResultResponseDto {

    private final Long resultId;
    private final Long songId;
    private final Integer accuracy;
    private final String recordFile;
    private final LocalDateTime createdDateTime;

    public ResultResponseDto(Result result) {
        this.resultId = result.getResultId();
        this.songId = result.getSong().getSongId();
        this.accuracy = result.getAccuracy();
        this.recordFile = result.getRecordFile();
        this.createdDateTime = result.getCreatedDateTime();
    }
}
