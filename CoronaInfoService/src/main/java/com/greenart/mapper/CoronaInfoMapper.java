package com.greenart.mapper;

import com.greenart.vo.CoronaSidoInfoVO;

import java.util.List;

import com.greenart.vo.CoronaInfoVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CoronaInfoMapper {
    public void insertCoronaInfo(CoronaInfoVO vo);
    public CoronaInfoVO selectCoronaInfoByDate(String date);

    public void insertCoronaSidoInfo(CoronaSidoInfoVO vo);
    public List<CoronaSidoInfoVO> selectCoronaSidoInfo(String date);
}
