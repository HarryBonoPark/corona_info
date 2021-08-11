package com.greenart.vo;

import java.util.Date;

import lombok.Data;

@Data
public class CoronaAgeInfoVO {
    private Integer confCase;
    private Date createDt;
    private Integer death;
    private String gubun;
}
