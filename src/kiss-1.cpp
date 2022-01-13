//Check that number in string representation is in min - max range 
void CRequest::checkIsCorrectValue(CString type, int min, int max) {	
    int interval = max-min;
	int faults = 0;
	for (int i = min; i <= max; i++) {  
        if (StrToInt(type) != i) faults++; 
    }
	
	if (faults == interval+1) return true;
	else return false;
}
