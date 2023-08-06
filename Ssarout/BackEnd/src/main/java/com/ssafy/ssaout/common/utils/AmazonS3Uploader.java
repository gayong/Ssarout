package com.ssafy.ssaout.common.utils;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class AmazonS3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile).orElseThrow(
            () -> new IllegalArgumentException("converting from MultipartFile to File failed."));
        return upload(file);
    }

    private String upload(File file) {
        String fileName = UUID.randomUUID().toString() + ".mp3";
        String uploadFileUrl = putS3(file, fileName);
        removeLocalFile(file);
        return uploadFileUrl;
    }

    private String putS3(File file, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private Optional<File> convert(MultipartFile multipartFile) throws IOException {
        String fileName = UUID.randomUUID().toString() + ".mp3";
        File convertFile = new File(System.getProperty("user.dir") + "/" + fileName);
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    private void removeLocalFile(File file) {
        if (file.delete()) {
            return;
        }
    }
}

