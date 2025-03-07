public with sharing class pathAssistInfoDTO {
    public pathAssistInfoDTO() {

    }

    Integer size;
    Integer totalSize;
    Boolean done;
    String queryLocator;
    String entityTypeName;

    public List<Record> records;

    public class Record{
        Attribute attributes;
        public String info;
    }

    public class Attribute{
        String type;
        String url;
    }
}