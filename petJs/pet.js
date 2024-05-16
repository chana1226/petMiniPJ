
function sample4_execDaumPostcode() { // 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if (roadAddr !== '') {
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if (data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}

function key() { // 입력한 글자수를 반환하기 위한 함수 정의
    document.getElementById('cnt').value = document.getElementById('textW').value.length;
    // id가 textW인 엘리먼트 값의 길이를 id가 cnt인 엘리먼트의 값에 대입
}

function chk() { // 입력폼 유효성 검사를 위한 함수 정의
    let name = document.getElementById('name').value; // 신청자 이름
    let phNum = document.getElementById('phone').vlaue; // 신청자 연락처
    let why = document.getElementById('textW').value.length; // 신청 사유
    let proT = document.getElementById('pro').value // 다짐

    if (name == '' || phNum == '' || why < 30 || proT == '') {
        alert('입력 양식 오류입니다. 입력 양식을 다시 한 번 확인해주세요.')
    } else {
        alert('입양 신청되었습니다. 입양 확정 및 안내는 입력해주신 번호로 연락드리겠습니다.')
    }
}

function addList() { // 관심공고 리스트에 추가하는 함수 (미해결)
    let schL = document.getElementById('petList'); // 검색 리스트 가져옴
    for (let i = 1; i < schL.rows.length; i++) {
        let info = schL.row[i].cells[0].innerTEXT;
        alert(info + '선택함');
    }
}

function delR() {
    alert('관심공고에서 삭제되었습니다.')
}