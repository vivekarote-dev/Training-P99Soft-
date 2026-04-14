import java.util.Arrays;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        System.out.println(myPow(2.00000, 10));
        System.out.println(Math.pow(2.00000, 10));
        }

    public static double myPow(double x, int n) {
        if(n<=0 ){
            return 1;
        }
            return x * myPow(x,n-1);
    }


    public int findTargetSumWays(int[] nums, int target) {

        if (tar)



    }

    private int helper(int[] nums, int target, int sum) {
        if(target == sum){
            return 1;
        }

        int count = 0;

        count += helper(Arrays.copyOfRange(nums,1,nums.length),target,sum+nums[0]);

    }


}