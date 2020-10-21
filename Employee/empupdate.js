
var edit, del;
const employeeArray = []

var isSeaching = false
var flag = false
var employeeEditIndex = -1;
var isSearchDel = false;
var searchContent = []
//var flag1 = false;



function employee(btn, isEdit)
{
	var i;

	tabcontent = document.getElementsByClassName("tabcontent");


	for (i = 0; i < tabcontent.length; i++)
        {
		tabcontent[i].style.display = "none";

	}

	flag = isEdit;


	document.getElementById(btn).style.display = "block";

}

function employee2(empArray) {
/*

	if(empArray.length == 0) {

		var x = document.getElementById('record').value;
		document.getElementById('record').innerHTML = x;
		document.getElementById('record').style.display = "block";

	}
*/



		if (empArray.length == 0 && !(isSeaching)) {
			empArray = employeeArray
		}
	//var listofrecords;
		//document.getElementsByClassName('tabcontent').

		tabcontent = document.getElementsByClassName("tabcontent");

		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		const table = document.getElementById('display')


		//listofrecords = table.rows.length;

		/*
		 if (table.rows.length > 1)
		 {
		 for (var j = 1; j <= table.rows.length; j++)
		 {
		 document.getElementById('display').deleteRow(j)
		 }

		 }
		 */




		while (table.rows.length > 1) {

			document.getElementById('display').deleteRow(table.rows.length - 1);
		}


		for (var i = 0; i < empArray.length; i++) {
			var display = document.getElementById("display");
			var newRow = display.insertRow(i + 1);

			// var details = [ecode, ename, ephno, etype, edesg, eemailid];
			var col;
			const employeesDataKeys = Object.keys(empArray[i])
			/*if (empArray.length == 0 && !(isSeaching)){
			 empArray = employeeArray
			 }*/
			for (col = 0; col < employeesDataKeys.length; col++) {
				var cell = newRow.insertCell(col);
				cell.innerHTML = empArray[i][employeesDataKeys[col]] ? empArray[i][employeesDataKeys[col]] : '';
				cell++;

			}

			edit = document.createElement('input');
			edit.setAttribute('type', 'button');
			edit.setAttribute('value', 'Edit');
			//edit.setAttribute('data', 'details');
			var cell = newRow.insertCell(col);
			cell.appendChild(edit);


			del = document.createElement('input');
			del.setAttribute('type', 'button');
			del.setAttribute('value', 'Delete');
			cell.appendChild(del);

			edit.setAttribute('onclick', 'editEmp(event)');
			del.setAttribute('onclick', 'deleteEmp(event)');

		}

		document.getElementById('emp2').style.display = "block";

}


function validate() {


	var ecode = document.myform.code.value;
	var ec = /^HIN[0-9]{3}$/;
	var ename = document.myform.name.value;
	var ephno = document.myform.phno.value;
	var eph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	var et = document.getElementById('type1');
	var etype = document.myform.type.value;
	var ed = document.getElementById('type2');
	var edesg = document.myform.desg.value;
	var eemailid = document.myform.email.value;
	var at = eemailid.indexOf("@");
	var dot = eemailid.lastIndexOf(".");
	var duplicate = false;


	if (ecode == null || ecode == "" || !(ecode).match(ec) || ecode.length > 6 || ecode.length < 6) {
		alert("enter valid code");
		ecode.focus();
		return false;
	}


	if (ename == null || ename == "") {
		alert("enter valid name");
		ename.focus();
		return false;
	}

	if (!(ephno).match(eph) || ephno.length > 10 || ephno.length < 10) {
		alert("enter valid Phone-Number");
		ephno.focus();
		return false;
	}

	if (!(et.value)) {
		alert("please select type of employee");
		etype.focus();
		return false;
	}

	if (!(ed.value)) {
		alert("please select designation of employee");
		edesg.focus();
		return false;
	}

	if (at < 1 || (dot - at < 2)) {
		alert(" enter correct email ID");
		eemailid.focus();
		return false;
	}


	var index = null

	for (var i = 0; i < employeeArray.length; i++)
	{
		if (flag && i === employeeEditIndex) {
			continue;
		}

		if (employeeArray[i].code === ecode) {
			alert('Your  ecode already existed')
			duplicate = true;
			break;

		}

		if (employeeArray[i].phno === ephno) {
			alert('Your mobile num already existed')
			duplicate = true;
			break;
		}

		if (employeeArray[i].emailid === eemailid) {
			alert('Your emailid already existed')
			duplicate = true;
			break;
		}
	}

	if (duplicate) {
		return;
	}

	if (flag) {
		employeeArray[employeeEditIndex].name = ename;ind
		employeeArray[employeeEditIndex].phno = ephno;
		employeeArray[employeeEditIndex].type = etype;
		employeeArray[employeeEditIndex].desg = edesg;
		employeeArray[employeeEditIndex].emailid = eemailid;
	} else {
		var obj = {
			code: ecode,
			name: ename,
			phno: ephno,
			type: etype,
			desg: edesg,
			emailid: eemailid
		}
		employeeArray.push(obj)
		console.log('employeeArray : ',employeeArray)
		document.getElementById("submit-form").reset();
	}
}

/*

	if(empArray.length == 0) {

		var x = document.getElementById('record').value;
		document.getElementById('record').innerHTML = x;
		document.getElementById('record').style.display = "block";

	}
*/

function editEmp(event) {
	flag = true;
	const  ind = event.path[2].sectionRowIndex - 1
	document.myform.code.value = employeeArray[ind].code;
	document.myform.name.value = employeeArray[ind].name;
	document.myform.phno.value = employeeArray[ind].phno;
	document.myform.type.value = employeeArray[ind].type;
	document.myform.desg.value = employeeArray[ind].desg;
	document.myform.email.value =employeeArray[ind].emailid;

	employeeEditIndex = ind;
	//document.getElementsById("co").setAttribute("readOnly",true)
	employee('emp1', true);
}

function deleteEmp(event) {

	const table = document.getElementById('display')

	const ind = event.path[2].sectionRowIndex-1


	//document.getElementById('display').deleteRow(ind)
	var index1 = null;
	if(searchContent.length != 0) {
		//employeeArray.splice(ind, 1);
		//isSearchDel = false;
		for(var i=0;i<employeeArray.length;i++)
		{
			//const empDataKeys = Object.keys(empArray[ind]);

			if(searchContent[ind].code === employeeArray[i].code)
			{
				index1 = i;
				break;
			}
		}

		searchContent.splice(ind,1);
		employeeArray.splice(index1,1);
	}

	if(index1 == null){
		employeeArray.splice(ind-1, 1);
	}


	//isSearchDel = false;
	employee2(employeeArray);


}

function resetform() {

	document.getElementById("co").value = " ";
	document.getElementById("na").value = " ";
	document.getElementById("ph").value = " ";
	document.getElementById("type1").value = " ";
	document.getElementById("type2").value = " ";
	document.getElementById("em").value = " ";
}

function searchemp(event) {
	isSeaching = true
	//isSearchDel = true;
	//console.log('event : ', event)
	const searchText = event.target.value
	const resultEmpArray = []
	for (var i = 0; i < employeeArray.length; i++) {
		if(employeeArray[i].code.includes(searchText)){
			resultEmpArray.push(employeeArray[i])	
		}
	}
	//console.log('resultEmpArray : ',resultEmpArray)
	searchContent = resultEmpArray;
	employee2(resultEmpArray)
}

function employee3(emp) {

	emp = employeeArray;
	employee2(emp);


}
