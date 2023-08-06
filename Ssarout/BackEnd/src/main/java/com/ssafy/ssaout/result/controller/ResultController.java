package com.ssafy.ssaout.result.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.result.dto.request.ResultCreateRequestDto;
import com.ssafy.ssaout.result.dto.response.ResultsResponseDto;
import com.ssafy.ssaout.result.service.ResultService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/result")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResponseEntity<Void> createResult(
        @Valid @ModelAttribute ResultCreateRequestDto resultCreateRequestDto,
        @RequestPart MultipartFile recordFile) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        resultService.createResult(resultCreateRequestDto, principal.getUsername(),
            recordFile);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ResultsResponseDto>> getResults() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        ResultsResponseDto resultsResponseDto = resultService.getResults(principal.getUsername());
        return ResponseEntity.ok(ApiResponse
            .<ResultsResponseDto>builder()
            .message("녹음 내역 조회 완료")
            .status(HttpStatus.OK.value())
            .data(resultsResponseDto)
            .build());
    }
}
