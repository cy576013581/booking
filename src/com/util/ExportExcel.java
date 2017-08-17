package com.util;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;

public class ExportExcel {
	HttpServletResponse response;
	// 文件名
	private String fileName ;
	//文件保存路径
	private String fileDir;
	//sheet名
	private int rowheigth = 1400;
	
	
	private String formtitle="教师课表";
	
	//表头字体
	private String titleFontType = "Arial Unicode MS";
	//表头背景色
	private String titleBackColor = "";
	//表头字号
	private short titleFontSize = 12;
	//添加自动筛选的列 如 A:M
	private String address = "";
	//正文字体
	private String contentFontType = "Arial Unicode MS";
	//正文字号
	private short contentFontSize = 11;
	//设置列的公式
	private String colFormula[] = null;
	
	private String data[][] = null;
	
	
	private HSSFWorkbook workbook = null;
	
	public ExportExcel(String fileDir){
	     this.fileDir = fileDir;
	     workbook = new HSSFWorkbook();
	}
	
	public ExportExcel(HttpServletResponse response,String fileName){
		 this.response = response;
		 this.fileName = fileName;
	     workbook = new HSSFWorkbook();
	}
    /**
     * 设置表头字体.
     * @param titleFontType
     */
	public void setTitleFontType(String titleFontType) {
		this.titleFontType = titleFontType;
	}
	public void setFormtitle(String formtitle) {
		this.formtitle = formtitle;
	}
    /**
     * 设置表头背景色.
     * @param titleBackColor 十六进制
     */
	public void setTitleBackColor(String titleBackColor) {
		this.titleBackColor = titleBackColor;
	}
	public void setData(String[][] data) {
		this.data = data;
	}
    /**
     * 设置表头字体大小.
     * @param titleFontSize
     */
	public void setTitleFontSize(short titleFontSize) {
		this.titleFontSize = titleFontSize;
	}
    /**
     * 设置表头自动筛选栏位,如A:AC.
     * @param address
     */
	public void setAddress(String address) {
		this.address = address;
	}
    /**
     * 设置正文字体.
     * @param contentFontType
     */
	public void setContentFontType(String contentFontType) {
		this.contentFontType = contentFontType;
	}
    /**
     * 设置正文字号.
     * @param contentFontSize
     */
	public void setContentFontSize(short contentFontSize) {
		this.contentFontSize = contentFontSize;
	}
	/**
	 * 设置列的公式 
	 * @param colFormula  存储i-1列的公式 涉及到的行号使用@替换 如A@+B@
	 */
	public void setColFormula(String[] colFormula) {
		this.colFormula = colFormula;
	}
	/*
	 * 设置行高
	 */
	public void setRowheigth(int rowheigth) {
		this.rowheigth = rowheigth;
	}
	/**
     * 写excel.
     * @param titleColumn  对应bean的属性名
     * @param titleName   excel要导出的表名
     * @param titleSize   列宽
     * @param dataList  数据
     */
	public void wirteExcel(String sheetName[],String titleName[][],int titleSize[],String[][][] dataList){
    	//添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
		OutputStream out = null;
		try {
			out = response.getOutputStream();
			fileName = fileName+".xls";
			response.setContentType("application/x-msdownload");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ URLEncoder.encode(fileName, "UTF-8"));
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
    	for(int sheetindex = 0; sheetindex < 20; sheetindex++){
    		Sheet sheet = workbook.createSheet(sheetName[sheetindex]);  
        	try {	 

    	    	//大标题
        		Row titleRow = workbook.getSheet(sheetName[sheetindex]).createRow(0); 
        		titleRow.setHeight((short) 700);
    	    	HSSFCellStyle titleStyle1 = workbook.createCellStyle();  
        		titleStyle1 = (HSSFCellStyle) setFont(titleStyle1, "Microsoft YaHei UI", (short) 20);
        		titleStyle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
        		titleStyle1.setAlignment(HSSFCellStyle.ALIGN_CENTER);//水平居中
        		Cell cell1=titleRow.createCell(0);
    	    	cell1.setCellStyle(titleStyle1);
    	    	cell1.setCellValue(formtitle+"——"+sheetName[sheetindex]);
    	    	CellRangeAddress region=new CellRangeAddress(0, 0, 0, 7);
    	    	sheet.addMergedRegion(region);
    	    	
    	    	//表头
    	    	Row titleNameRow = workbook.getSheet(sheetName[sheetindex]).createRow(1); 
    	    	HSSFCellStyle titleStyle = workbook.createCellStyle();  
        		titleStyle = (HSSFCellStyle) setFontAndBorder(titleStyle, titleFontType, (short) titleFontSize);
    	    	titleStyle = (HSSFCellStyle) setColor(titleStyle, titleBackColor, (short)10);
    	    	for(int i = 0;i < 8;i++){
    	    		sheet.setColumnWidth(i, titleSize[i]*256); //设置宽度 	
    	    		Cell cell = titleNameRow.createCell(i);
    	    		cell.setCellStyle(titleStyle);
    	    		cell.setCellValue(titleName[sheetindex][i].toString());
    	    	}

    	    	//为表头添加自动筛选
    	    	if(!"".equals(address)){
    				CellRangeAddress c = (CellRangeAddress) CellRangeAddress.valueOf(address);
    		    	sheet.setAutoFilter(c);
    			}
    	    	
    	    	//通过反射获取数据并写入到excel中
    	    	if(dataList!=null){
    	    		//设置样式
    	    		HSSFCellStyle dataStyle = workbook.createCellStyle();  
    	    		titleStyle = (HSSFCellStyle) setFontAndBorder(titleStyle, contentFontType, (short) contentFontSize);
    	    		titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
    	    		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);//水平居中 
    	    		HSSFCellStyle titleStyle0 = workbook.createCellStyle();  
    	    		titleStyle0 = (HSSFCellStyle) setFontAndBorder1(titleStyle0, contentFontType, (short) contentFontSize);
    	    		titleStyle0.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直居中
    	    		titleStyle0.setWrapText(true);
    	    		for(int rowIndex = 2;rowIndex<8;rowIndex++){
        	    		Row dataRow = workbook.getSheet(sheetName[sheetindex]).createRow(rowIndex);
        	    		dataRow.setHeight((short) rowheigth);
        	    		for(int columnIndex = 0;columnIndex<8;columnIndex++){
        	    			Cell cell = dataRow.createCell(columnIndex);
    						cell.setCellStyle(titleStyle0);
    						cell.setCellValue(dataList[sheetindex][rowIndex-2][columnIndex]);
    	    	    	}
        	    		
        	    	}
    	    	    
    	    	}
    	    	
    			
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
        	
    	}
    	try {
			workbook.write(out);
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
    /**
     * 将16进制的颜色代码写入样式中来设置颜色
     * @param style  保证style统一
     * @param color 颜色：66FFDD
     * @param index 索引 8-64 使用时不可重复
     * @return
     */
    public CellStyle setColor(CellStyle style,String color,short index){
    	if(color!=""&&color!=null){
			//转为RGB码
    		int r = Integer.parseInt((color.substring(0,2)),16);   //转为16进制
    		int g = Integer.parseInt((color.substring(2,4)),16);
    		int b = Integer.parseInt((color.substring(4,6)),16);
    		//自定义cell颜色
    		HSSFPalette palette = workbook.getCustomPalette(); 
    		palette.setColorAtIndex((short)index, (byte) r, (byte) g, (byte) b);
    	
    		style.setFillPattern(CellStyle.SOLID_FOREGROUND); 
    		style.setFillForegroundColor(index);
		}
        return style;	
    }
   
    /**
     * 设置字体并加外边框
     * @param style  样式
     * @param style  字体名
     * @param style  大小
     * @return
     */
    public CellStyle setFontAndBorder(CellStyle style,String fontName,short size){
    	HSSFFont font = workbook.createFont();  
        font.setFontHeightInPoints(size);    
        font.setFontName(fontName); 
        font.setBold(true);
        style.setFont(font);
        style.setBorderBottom(CellStyle.BORDER_THIN); //下边框    
        style.setBorderLeft(CellStyle.BORDER_THIN);//左边框    
        style.setBorderTop(CellStyle.BORDER_THIN);//上边框    
        style.setBorderRight(CellStyle.BORDER_THIN);//右边框   
        return style;
    }
    public CellStyle setFontAndBorder1(CellStyle style,String fontName,short size){
    	HSSFFont font = workbook.createFont();  
        font.setFontHeightInPoints(size);    
        font.setFontName(fontName); 
        style.setFont(font);
        style.setBorderBottom(CellStyle.BORDER_THIN); //下边框    
        style.setBorderLeft(CellStyle.BORDER_THIN);//左边框    
        style.setBorderTop(CellStyle.BORDER_THIN);//上边框    
        style.setBorderRight(CellStyle.BORDER_THIN);//右边框   
        return style;
    }
    public CellStyle setFont(CellStyle style,String fontName,short size){
    	HSSFFont font = workbook.createFont();  
        font.setFontHeightInPoints(size);    
        font.setFontName(fontName); 
        font.setBold(true);
        style.setFont(font);
        return style;
    }
	/**
	 * 删除文件
	 * @param fileDir
	 * @return
	 */
    public boolean deleteExcel(){
    	boolean flag = false;
    	File file = new File(this.fileDir);
    	// 判断目录或文件是否存在  
        if (!file.exists()) {  // 不存在返回 false  
            return flag;  
        } else {  
            // 判断是否为文件  
            if (file.isFile()) {  // 为文件时调用删除文件方法  
                file.delete();
                flag = true;
            } 
        }
        return flag;
    }
    /**
	 * 删除文件
	 * @param fileDir
	 * @return
	 */
    public boolean deleteExcel(String path){
    	boolean flag = false;
    	File file = new File(path);
    	// 判断目录或文件是否存在  
        if (!file.exists()) {  // 不存在返回 false  
            return flag;  
        } else {  
            // 判断是否为文件  
            if (file.isFile()) {  // 为文件时调用删除文件方法  
                file.delete();
                flag = true;
            } 
        }
        return flag;
    }
}