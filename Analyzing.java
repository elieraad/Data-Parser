import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class Analyzing {

 public static void main(String[] args) throws IOException {
  File srcFile = new File("data.txt");
  Scanner fileScan = new Scanner(srcFile);
  Analyzer nn = new Analyzer(42, 42);

  String[] inputStr = new String[7];
  String[] outputStr = new String[7];

  int[] input = new int[7];
  int[] output = new int[7];

  fileScan.nextLine();

  inputStr = fileScan.nextLine().split("\t");

  for (int i = 0; i < inputStr.length; i++) {
   input[i] = Integer.parseInt(inputStr[i]);
  }

  System.out.println();
  while (fileScan.hasNextLine()) {
   outputStr = fileScan.nextLine().split("\t");

   for (int i = 0; i < outputStr.length; i++) {
    output[i] = Integer.parseInt(outputStr[i]);
   }

   nn.train(input, output);
   input = output;
  }

  nn.predict(input);

  fileScan.close();

 }

}
