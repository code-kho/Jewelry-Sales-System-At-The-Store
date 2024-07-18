package com.example.salesystematthestore.service.imp;

import com.example.salesystematthestore.dto.RequestTransferDTO;
import com.example.salesystematthestore.payload.request.TransferRequest;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RequestTransferServiceImp {

    boolean createTransferRequest(TransferRequest transferRequest);

    boolean approveTransfer( int userId,  int transferRequestId);

    boolean cancelTransfer(int userId, int transferRequestId);

    boolean completeTransfer(int userId, int transferRequestId);

    List<RequestTransferDTO> getAllRequestTransfer(int counterId);

    RequestTransferDTO getRequestTransferById(int transferRequestId);

    List<RequestTransferDTO> getAllRequestInCounterReceived(int counterId);

}
