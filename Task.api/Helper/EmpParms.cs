namespace Task.Api.Helper
{
    public class EmpParms
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public string Name { get; set; }
        public string Phone { get; set; }
        private int pageSize = 10;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }


    }
}