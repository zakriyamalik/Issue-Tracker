document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e)
{  
   
    console.log("In saveIssue\n");
    let issueDesc=document.getElementById('issueDescInput').value;
    let issueSeverity=document.getElementById('issueSeverityInput').value;
   
    let issueAssignedTo=document.getElementById('issueAssingedToInput').value;
    console.log("issueDesc,issueSeverity,issueAssignedTo\t\t", issueDesc,issueSeverity,issueAssignedTo)
    let issueId= chance.guid();
   console.log("issueId\n",issueId);

    let issueStatus='Open';
  
    let issue={
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus

    }
   if(localStorage.getItem('issues')===null)
        {
           
            let issues=[];
            issues.push(issue);
            for(let i=0;i<issues.length;i++)
                {
               console.log("issues if\t",issues[i],"\n");
                }
            localStorage.setItem('issues',JSON.stringify(issues));
            
           
        }
        else
        {
            let issues=JSON.parse(localStorage.getItem('issues'));
            issues.push(issue);
            for(let i=0;i<issues.length;i++)
                {
               console.log("issues else \t",issues[i],"\n");
                }
            localStorage.setItem('issues',JSON.stringify(issues));
        }
      
        document.getElementById('issueInputForm').reset();
       
        fetchIssues();
     
}
function setStatusClosed(id)
{
    var issues=JSON.parse(localStorage.getItem('issues'));
    for(var i=0;i<issues.length;i++)
    {
        if(issues[i].id===id)
        {
            issues[i].status='Closed';
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id)
{
    var issues=JSON.parse(localStorage.getItem('issues'));
    for(var i=0;i<issues.length;i++)
    {
        if(issues[i].id===id)
        {
           issues.splice(i,1);
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}
function fetchIssues()
{
   
    let issues=JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issueList');
   
   issuesList.innerHTML='';
   if(issues.length!=null)
   {
   for(let i=0; i<issues.length;i++)
        {
            let id=issues[i].id;
            let desc=issues[i].desc;
            let severity=issues[i].severity;
            let assignedTo=issues[i].assignedTo;
           //////////////// console.log("Issues\t",id,desc,severity,assignedTo);
   
            let status=issues[i].status;

            issuesList.innerHTML+='<div class="well"'+
                                    '<h6>Issue ID: ' + id + '</h6>' +
                                    '<p><span class="label label-info>' + '</span></p>'+
                                    '<h3>' + desc + '</h3>' + 
                                    '<p><span class="glyphicon glyphicon-time"></span>' + severity +'</p>' + 
                                    '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                    '<p><span class="glyphicon glyphicon-status"></span>' + status + '</p>' +
                                    '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                                    '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                    '</div>';
        }
   }
   else
   {
    console.log("Kuch bhi nahi");
   }
    
}