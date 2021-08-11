package com.greenart.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.greenart.mapper.CoronaInfoMapper;
import com.greenart.vo.CoronaInfoVO;
import com.greenart.vo.CoronaSidoInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoronaInfoService {
    @Autowired
    CoronaInfoMapper mapper;
    public void insertCoronaInfo(CoronaInfoVO vo) {
        mapper.insertCoronaInfo(vo);
    }
    public CoronaInfoVO selectTodayCoronaInfo() {
        // Calendar start = Calendar.getInstance();
        // Calendar end = Calendar.getInstance();

        // start.set(Calendar.HOUR_OF_DAY, 10);
        // start.set(Calendar.MINUTE, 30);
        // start.set(Calendar.SECOND, 0);
        // 10시 30분 - 10시 29분까지는 이전 날의 데이터가 표시되어야한다.
        // 그래서 복잡스 그래서 캘린더로 표시를 해주겠다.

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String date = formatter.format(now);

        CoronaInfoVO data = mapper.selectCoronaInfoByDate(date);

        Integer accExamCnt = data.getAccExamCnt();
        Integer decideCnt = data.getDecideCnt();

        DecimalFormat dFormatter = new DecimalFormat("###,###");
        String strAccExamCnt = dFormatter.format(accExamCnt);
        String strDecideCnt = dFormatter.format(decideCnt);

        data.setStrAccExamCnt(strAccExamCnt);
        data.setStrDecideCnt(strDecideCnt);

        return data;
    }

    public void insertCoronaSidoInfo(CoronaSidoInfoVO vo) {
        mapper.insertCoronaSidoInfo(vo);
    }

    public List<CoronaSidoInfoVO> selectTodayCoronaSidoInfo(){
        Calendar now = Calendar.getInstance();
        Calendar standard = Calendar.getInstance();
        standard.set(Calendar.HOUR_OF_DAY, 10);
        standard.set(Calendar.MINUTE, 30);
        standard.set(Calendar.SECOND, 10);

        if(now.getTimeInMillis() < standard.getTimeInMillis()) {
            // 현재 접속시간이 기준시간 (10시 30분 10초) 보다 이전일 때
            // 전 날 정보를 가져온다.
            now.add(Calendar.DATE, -1);
        }
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dt = formatter.format(now.getTime());

        return mapper.selectCoronaSidoInfo(dt);
    }
    public List<CoronaSidoInfoVO> selectCoronaSidoInfo(String date) {
        return mapper.selectCoronaSidoInfo(date);
    }
}
