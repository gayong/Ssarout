package com.ssafy.ssaout.result.dto.response;


import java.util.List;
import lombok.Getter;

@Getter
public class ResultsResponseDto {

    private final List<ResultResponseDto> results;
    private final Integer resultCount;

    public ResultsResponseDto(List<ResultResponseDto> results, Integer resultCount) {
        this.results = results;
        this.resultCount = resultCount;
    }
}
