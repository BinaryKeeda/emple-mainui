# import sys

# def twoSum(nums, target):
#     num_index = {}  # Dictionary to store numbers and their indices

#     for i, num in enumerate(nums):
#         complement = target - num  # Find the number we need to sum to target

#         if complement in num_index:
#             return [num_index[complement], i]  # Return indices of the pair

#         num_index[num] = i  # Store current number's index

#     return [-1, -1]  # No valid pair found

# if __name__ == "__main__":
#     target = int(input().strip())
#     nums = list(map(int, input().strip().split()))
#     ls = twoSum(nums, target)  # Correct indentation
#     for i in ls:
# 	  print(i,end=" ")
