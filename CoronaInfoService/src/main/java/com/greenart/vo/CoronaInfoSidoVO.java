package com.greenart.vo;

import java.util.Date;

import lombok.Data;

@Data
public class CoronaInfoSidoVO {
    private Integer createDt;
    private Date deathCnt;
    private Integer defCnt;
    private String gubun;
    private Integer incDec;
    private Integer isolClearCnt;
    private Integer isolIngCnt;
    private Integer localOccCnt;
    private Integer overFlowCnt;
}
