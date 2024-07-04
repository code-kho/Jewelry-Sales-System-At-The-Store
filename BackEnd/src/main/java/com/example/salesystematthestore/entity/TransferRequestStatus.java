package com.example.salesystematthestore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "transfer_request_status")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequestStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statusId;


    @Column(name = "status_name")
    private String statusName;

    @OneToMany(mappedBy = "transferRequestStatus", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH,CascadeType.REFRESH,CascadeType.MERGE,CascadeType.PERSIST})
    private List<TransferRequests> transferRequestsList;
}
