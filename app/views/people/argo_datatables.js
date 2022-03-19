var argo_datatables = {
    defaultPageLength: 25,
    language: { emptyTable: "Loading..." },
    defaultColumns: [
        {data: "series_id"},
        {data: "title"},
        {data: "phase"},
        {data: "stage"},
        {data: "creator_org"},
        {data: "waiting_on"},
        {data: "update_date"}
    ],
    getColumnDefs: function(titleIndex){
        var types = {
            "Intent": "intents",
            "Issuance": "issuances",
            "Package": "packages"
        };
        return {
            targets: titleIndex,
            render: function(data, type, row){
                var type = "default";
                return "<a href=/" + types[row.phase] +  "/" + row.id + ">" + data + "</a>"
            }
        }
    },
    getSortOrder: function(columns, columnName, dir){
        var index = columns.findIndex(function(element){
            //element looks like { "data": columnName }
            return element.data == columnName;
        });
        return [[index, dir]];
    }
};

$(document).ready(function(){
    var columns = [{data: "due_date"}].concat(argo_datatables.defaultColumns);
    $("#action-required_dttb").DataTable({
        pageLength: argo_datatables.defaultPageLength,
        order: [[7, "desc"]], //update date
        order: argo_datatables.getSortOrder(columns, "updated_date", "desc"),
        ajax: '/argo/action_required_json',
        columns: columns,
        columnnDefs: argo_datatables.getColumnDefs(2)
    });
    
    var intentsDtb = $("#my-intents-dttb").DataTable({
        pageLength: argo_datatables.defaultPageLength,
        order: argo_datatables.getSortOrder(argo_datatables.defaultColumns, "updated_date", "desc"),
        language: argo_datatables.language,
        columns: argo_datatables.defaultColumns,
        columnnDefs: argo_datatables.getColumnDefs(1)
    });
    
    var issuanceDtb = $("#my-issuances-dttb").DataTable({
        pageLength: argo_datatables.defaultPageLength,
        order: argo_datatables.getSortOrder(argo_datatables.defaultColumns, "updated_date", "desc"),
        language: argo_datatables.language,
        columns: argo_datatables.defaultColumns,
        columnnDefs: argo_datatables.getColumnDefs(1)
    });

    //set tab click events
    $("#intents_tab a").click(function(e){
        intentsDtb.ajax.url("/arog/my_intents_json").load();
    });

    $("#issuances_tab a").click(function(e){
        issuanceDtb.ajax.url("/arog/my_issuances_json").load();
    });
});
